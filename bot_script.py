from langchain_community.llms.ollama import Ollama
from langchain_community.vectorstores import FAISS
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings

import os

embedding=OllamaEmbeddings(model='mxbai-embed-large')
db=FAISS.load_local(folder_path="./vectordb",index_name="vector_store",embeddings=embedding,allow_dangerous_deserialization=True)
llm = Ollama(
    model="phi3:mini"
)
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_template(
    """
            <|system|>
            You are a helpful Business Advisor that assists small scale business owners with their queries.<|end|>
            <|user|>
            Answer the following question as simply as possible based on the given context ONLY if it is RELEVANT to the Question in less than 100 words if it is IRRELEVANT tell me I don't know.
            Do not mention the context in the answer just use it as a knowledge base
            {context}
            Question:
            {input}
            <|end|>
            <|assistant|>

"""
)
from langchain.chains.combine_documents import create_stuff_documents_chain

docs_chain = create_stuff_documents_chain(llm, prompt)
retriever = db.as_retriever()
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)
contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)


### Answer question ###
system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)


### Statefully manage chat history ###
store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    print((type(store[session_id])))
    return store[session_id]


conversational_rag_chain = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)
inp=str(input("Enter the question: "))
response = conversational_rag_chain.invoke({"input": inp},{"configurable": {"session_id": "1"}})
print(response['answer'])

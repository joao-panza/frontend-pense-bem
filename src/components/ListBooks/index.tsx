import { FC, ReactElement, useEffect, useState } from "react";
import { Book } from "..";

const baseUrl = "http://localhost:4000/";

export const ListBooks: FC = (): ReactElement => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(true);
    const [books, setBooks] = useState<any[]>();
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    useEffect(() => {        
        setLoading(true);

        fetch(baseUrl.concat("book/list"))
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.books);
                setLoading(false);
            })
            .catch((error) => {
                setError(error)
                setLoading(false);
            });
    }, []);

    function renderLoading(): ReactElement{
        return (
            <div>loading...</div>
        );
    }

    function handleSelectBook(bookId: string): void {
        //TODO: buscar programas do livro selecionado
        setSelectedBook(bookId);
    }

    function renderBooks(): ReactElement {
        return (
            <div>
                <div>Livros</div>
                <div>Livro Selecionado: {selectedBook}</div>
                {!selectedBook && books && books.map(({id, ...book}) => {
                    return (
                        <Book bookId={id} {...book} handleSelectBook={handleSelectBook}/>
                    );
                })}
            </div>
        )
    }

    return loading ? renderLoading() : renderBooks();
}
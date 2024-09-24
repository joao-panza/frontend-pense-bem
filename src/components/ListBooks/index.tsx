import { FC, ReactElement, useEffect, useState } from "react";
import { Book } from "..";

const baseUrl = "http://localhost:4000";

export const ListBooks: FC = (): ReactElement => {
    const [loading, setLoading] = useState<boolean>(true);
    const [, setError] = useState<boolean>(true);
    const [books, setBooks] = useState<any[]>();
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [programs, setPrograms] = useState<any[]>();

    useEffect(() => {        
        setLoading(true);

        fetch(baseUrl.concat("/book/list"))
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.books);
                setLoading(false);
            });
    }, []);

    function renderLoading(): ReactElement{
        return (
            <div>loading...</div>
        );
    }

    function handleSelectBook(bookId: string): void {
        setLoading(true);
        fetch(baseUrl.concat("/book/", bookId, "/program/list"))
            .then((response) => response.json())
            .then((data) => {
                setPrograms(data.programs);
                setLoading(false);
            });
        setSelectedBook(bookId);
    }

    function renderBooks(): ReactElement {
        return (
            <div>
                <div>Livros</div>
                <div>Livro Selecionado: {selectedBook}</div>
                {!selectedBook && books?.map(({id, ...book}) => {
                    return (
                        <Book key={id} bookId={id} {...book} handleSelectBook={handleSelectBook}/>
                    );
                })}

                {programs?.map((program) => {
                    return (
                        <div key={program.programId}>
                            <span>ID: </span>
                            <span>{program.programId}</span>
                        </div>
                    );
                })}
            </div>
        )
    }

    return loading ? renderLoading() : renderBooks();
}
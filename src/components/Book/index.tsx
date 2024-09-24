import { FC, ReactElement } from "react";

type BookProps = {
    bookId: string;
    title: string;
    author: string;
    edition: string;
    year: number;
    pages: number;
    publisher: string;
    image: string;
    handleSelectBook: (bookId: string) => void;
}

export const Book: FC<BookProps> = (props): ReactElement => {
    const handleSelectBook = () => {
        props.handleSelectBook(props.bookId);
    }

    return (
        <div key={props.bookId} onClick={handleSelectBook} style={{ cursor: "pointer" }}>
            <img src={props.image} alt={props.title} width="10%" />
            <div>
                <span>Título: </span>
                <span>{props.title}</span>
            </div>
            <div>
                <span>Autor: </span>
                <span>{props.author}</span>
            </div>
            <div>
                <span>Edição: </span>
                <span>{props.edition}</span>
            </div>
            <div>
                <span>Ano: </span>
                <span>{props.year}</span>
            </div>
            <div>
                <span>Páginas: </span>
                <span>{props.pages}</span>
            </div>
            <div>
                <span>Editora: </span>
                <span>{props.publisher}</span>
            </div>
        </div>
    );
}
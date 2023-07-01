export interface IQuotes {
    author:string,
    category: string,
    text: string
}

export interface IQuotesMut {
    author:string,
    category: string,
    text: string,
    id: string;
}

export interface IApiText {
    [id: string]: IQuotesMut;
}
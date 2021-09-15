import styles from "./Paginator.module.css";
import React from "react";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator = (props: PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map(p => {
                return (
                    <span className={(p === props.currentPage) ? styles.selectedPage : ''}
                          onClick={() => {
                              props.onPageChanged(p)
                          }}
                    > {p}</span>
                )
            })}

        </div>
    )
}
export default Paginator;

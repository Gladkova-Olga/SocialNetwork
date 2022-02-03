import styles from "./Paginator.module.scss";
import React, {useState} from "react";
import styleBtn from "../../../styles/common/Btn.module.scss"

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

const Paginator = (props: PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionCount = Math.ceil(pagesCount / props.portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * props.pageSize + 1;
    const rightPortionPageNumber = portionNumber * props.pageSize;


    return (
        <div className={styles.paginator}>
            <button onClick={() => setPortionNumber(portionNumber - 1)}
                    disabled={portionNumber <= 1} className={styleBtn.btnSecondVariant}>
                Prev
            </button>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return (
                        <span className={(p === props.currentPage) ? styles.selectedPage : styles.pageNumber}
                              onClick={() => {
                                  props.onPageChanged(p)
                              }}
                        > {p}</span>
                    )
                })}
            <button onClick={() => setPortionNumber(portionNumber + 1)}
                    className={styleBtn.btnSecondVariant} disabled={portionNumber >= portionCount}>
                Next
            </button>

        </div>
    )
}
export default Paginator;

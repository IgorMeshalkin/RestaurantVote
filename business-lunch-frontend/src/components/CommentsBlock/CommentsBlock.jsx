import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from './CommentsBlock.module.css'
import RegularButton from "../UI/RegularButton/RegularButton";
import BoldArrow from "../UI/BoldArrow/BoldArrow";
import {useFetching} from "../../hooks/useFetching";
import CommentAPI from "../../API/CommentAPI";
import CommentItem from "./CommentItem/CommentItem";
import {conversionStyleWithPxToNumber} from "../../utils/strings";
import LineLoader from "../Loaders/LineLoader";
import UpButton from "../UI/UpButton/UpButton";
import {AuthContext} from "../../context/context";

const CommentsBlock = ({restaurantId, width}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const innerWindowRef = useRef()
    const outWindowRef = useRef()
    const totalCommentHeight = useRef(50);
    const hiddenElement = useRef()

    const [isOpen, setIsOpen] = useState(false)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [comments, setComments] = useState([])
    const [commentStartCoordinates, setCommentStartCoordinates] = useState()
    const [totalComments, setTotalComments] = useState()
    const [isRefusalToOpen, setIsRefusalToOpen] = useState(false)

    useEffect(() => {
        fetchFirstPage()
        setTimeout(() => setCommentStartCoordinates(outWindowRef.current.getBoundingClientRect().top - 60), 500)
    }, [])

    useEffect(() => {
        fetchNextPage()
    }, [page])

    useEffect(() => {
        if (comments.length > 10) {
            enlargementCommentsWindow()
        }
    }, [comments])

    useEffect(() => {
        if (isOpen) {
            enlargementCommentsWindow()
            outWindowRef.current.setAttribute('style', 'padding: 5px')
        } else {
            innerWindowRef.current.setAttribute('style', 'height: 0; padding: 0')
            hiddenElement.current.setAttribute('style', 'height: 0')
            setTimeout(() => outWindowRef.current.setAttribute('style', 'padding: 5px 5px 0'), 450)
        }
    }, [isOpen])

    const [fetchFirstPage, isFirstPageLoading, firstPageLoadingError] = useFetching(async () => {
        const response = await CommentAPI.getAll(restaurantId, limit, page)
        setComments(response.data)
        setTotalComments(response.headers['x-total-count'])
    })

    const [fetchNextPage, isNextPageLoading, nextPageLoadingError] = useFetching(async () => {
        const response = await CommentAPI.getAll(restaurantId, limit, page)
        setComments([...comments, ...response.data])
    })

    function plusCommentHeight(commentBody) {
        const marginBottomNumber = conversionStyleWithPxToNumber(commentBody.style.marginBottom)
        const addedValue = commentBody.getBoundingClientRect().height + marginBottomNumber
        totalCommentHeight.current = totalCommentHeight.current + addedValue;
    }

    function backToTop() {
        window.scrollTo({
            top: commentStartCoordinates, behavior: "smooth"
        })
    }

    function refusalToOpen() {
        setIsRefusalToOpen(true)
        setTimeout(() => setIsRefusalToOpen(false), 400)
    }

    function enlargementCommentsWindow() {
        hiddenElement.current.setAttribute('style', 'height:' + totalCommentHeight.current + 'px')
        window.scrollBy({
            top: 300, behavior: "smooth"
        })
        innerWindowRef.current.setAttribute('style', 'height:' + totalCommentHeight.current + 'px')
    }

    // function asd() {
    //     return navigate("/");
    // }

    return (<div className={cl.outMain} ref={outWindowRef}>
        <div className={cl.header}>
            <span className={cl.titleMain}>Комментарии (
                <span className={isRefusalToOpen ? cl.commentCountRefusal : cl.commentCount}>{totalComments}</span>
                )</span>
            <span onClick={totalComments > 0 ? () => setIsOpen(!isOpen) : () => refusalToOpen()}
                  className={cl.arrowContainer}>
                    <BoldArrow
                        direction={isOpen ? 'up' : 'down'}
                    />
                </span>
            <span className={cl.newCommentButtonContainer}>
                    <RegularButton>Написать комментарий</RegularButton>
                </span>
        </div>

        <div className={cl.innerMain} ref={innerWindowRef}>
            {!isFirstPageLoading && comments.map(comm => <CommentItem
                key={comm.id}
                comment={comm}
                width={width - 20}
                getCommentHeight={plusCommentHeight}
                isEnd={comments.indexOf(comm) === comments.length - 1}
            />)}
            {
                isNextPageLoading ?
                    <div className={cl.footer}>
                        <LineLoader/>
                    </div> :
                    <div className={cl.footer}>
                        <div className={comments.length < totalComments ? cl.showMoreButton : cl.notShowMoreButton}
                             onClick={() => setPage(page + 1)}>Показать ещё</div>
                        <div className={comments.length < totalComments ? cl.upButtonContainer : cl.upButtonContainerCenter}>
                            <UpButton action={backToTop}/>
                        </div>
                    </div>
            }
        </div>
        <div className={cl.hiddenElement} ref={hiddenElement}/>



        {/*<button style={{position: "fixed", top: "100px", left: "200px"}} onClick={asd}>PRINT</button>*/}
        {/*<Link to={"/"}>*/}
        {/*    <button style={{position: "fixed", top: "100px", left: "200px"}} onClick={asd}>PRINT</button>*/}
        {/*</Link>*/}
        {/*<button style={{position: "fixed", top: "300px", left: "200px"}} onClick={dsa}>ACTION</button>*/}
    </div>);
};

export default CommentsBlock;
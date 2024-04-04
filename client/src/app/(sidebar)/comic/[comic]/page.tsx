import styles from '@/app/(sidebar)/comic/[comic]/comic.module.css'
import CommentForm from '@/component/Atoms/CommentForm/CommentForm'
import getChapter from '@/services/getChapter'
import getComicDetail from '@/services/getComicDetail'
import { faEye, faReply, faThumbsDown, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Comic = async ({ params }: { params: { comic: string } }) => {

    const comicData = (await getComicDetail(params.comic))?.data
    const comicChapters = (await getChapter(params.comic))?.data.sort((chapter1, chapter2) => {chapter1.chap_num < chapter2.chap_num ? 1 : -1})
    

    return <div className={styles.container}>
        <div className={styles.breadCrumbs}>
            <a href="">home</a> {'>'} <a href="">{comicData.id}</a>
        </div>
        <div className={styles.title}>
            <h1 className={styles.mainTitle}>{comicData.title}</h1>
            {comicData.other_title != null && 
                <h2 className={styles.otherTitle}>{comicData.other_title}</h2>
            }
        </div>
        <div className={styles.comicDetail}>
            <div className={styles.leftSide}>
                <img src={comicData.comic_image_src} className={styles.comicImage} alt="" width={200} height={280}/>
                <div className={styles.actionContainer}>
                    <a href="">First Chapter</a>
                    <a href="">Newest Chapter</a>
                    <a href="">Follow</a>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.info}>
                    <div className={styles.author}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faUser}/>
                            Author
                        </div>
                        <a href="" className={styles.value}>{comicData.author}</a>
                    </div>
                    <div className={styles.views}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faEye}/>
                            Views
                        </div>
                        <span className={styles.value}>5.343.234</span>
                    </div>
                    <div className={styles.categories}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faUser}/>
                            Categories
                        </div>
                        <div className={styles.value}>
                            {comicData.categories.map((e, i) => {
                                return <a href='' className={styles.category} key={i}>{e}</a>
                            })}
                            <a href='' className={styles.category}>action</a>
                            <a href='' className={styles.category}>action</a>
                            <a href='' className={styles.category}>action</a>
                            <a href='' className={styles.category}>action</a>
                        </div>
                    </div>
                </div>

                <div className={`${styles.storyLineBlock} ${styles.block}`}>
                    <h1 className={styles.header}>Storyline</h1>
                    <div className={styles.breakLine}></div>
                    <div className={styles.storyLine}>{comicData.storyline}</div>
                </div>
            </div>
        </div>

        <div className={`${styles.chapterBlock} ${styles.block}`}>
            <h1 className={styles.header}>Chapter</h1>
            <div className={styles.breakLine}></div>
            <div className={styles.chapterContainer}>
                {comicChapters.map((e) => {
                    return <div className={styles.chapter} key={e.id}>
                        <a href="">Chapter {e.chap_num}</a>
                        <div className={styles.spaceLine}></div>
                        <span className={styles.uploadTime}>{new Date(e.uploaded_time).toLocaleDateString("ja")}</span>
                        <div className={styles.spaceLine}></div>
                        <div className={styles.views}>
                            <FontAwesomeIcon icon={faEye}/>
                            5.000
                        </div>
                    </div>
                })}
            </div>
        </div>

        <div className={`${styles.commentBlock} ${styles.block}`}>
            <h1 className={styles.header}>Comment</h1>
            <div className={styles.breakLine}></div>

            <CommentForm/>

            <div className={styles.commentContainer}>
                {[1, 2, 3, 4].map((e, i) => {
                    return <div key={i} className={styles.comment}>
                        <img src={comicData.comic_image_src} alt="" className={styles.commentedUserAvt}/>
                        <div className={styles.commentRightSide}>
                            <div className={styles.commentBox}>
                                <a href="" className={styles.commentUserName}>ten</a>
                                <span className={styles.content}></span>
                            </div>
                            <div className={styles.commentInfo}>
                                <span className={styles.postedTime}>5h</span>
                                <span className={styles.commentedChapter}>chapter 1</span>
                                <div className={styles.commentAction}>
                                    <FontAwesomeIcon icon={faThumbsUp}/>
                                    <FontAwesomeIcon icon={faThumbsDown}/>
                                    <FontAwesomeIcon icon={faReply}/>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}
export default Comic

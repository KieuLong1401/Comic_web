import styles from '@/app/(sidebar)/comic/[comic]/comic.module.css'
import axiosInstance from '@/utils/axiosInstance'
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

const Comic = async ({ params }: { params: { comic: string } }) => {
    const comicData = (await axiosInstance.get(`/comic/${params.comic}`)).data

    console.log(comicData)

    return <div className={styles.container}>
        <div className={styles.breadCrumbs}>
            <a href="">home</a> {'>'} <a href="">{comicData.id}</a>
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
                <h1 className={styles.comicName}>{comicData.title}</h1>
                <div className={styles.info}>
                    {comicData.other_title != null && <div className={styles.otherTitle}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faUser}/>
                            other title
                        </div>
                        <a href="" className={styles.value}>{comicData.other_title}</a>
                    </div>}
                    <div className={styles.author}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faUser}/>
                            author
                        </div>
                        <a href="" className={styles.value}>{comicData.author}</a>
                    </div>
                    <div className={styles.views}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faEye}/>
                            views
                        </div>
                        <span className={styles.value}>5.343.234</span>
                    </div>
                    <div className={styles.categories}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faUser}/>
                            categories
                        </div>
                        <div className={styles.value}>
                            {comicData.categories.map(e => {
                                return <a href='' className={styles.category}>{e}</a>
                            })}
                        </div>
                    </div>
                </div>

                <div className={styles.storyLineBlock}>
                    <h1 className={styles.header}>Storyline</h1>
                    <div className={styles.breakLine}></div>
                    <div className={styles.storyLine}>{comicData.storyline}</div>
                    <button>more</button>
                </div>
            </div>
        </div>

        <div className={styles.chapterBlock}>
            <h1 className={styles.header}>Chapter</h1>
            <div className={styles.breakLine}></div>
            <div className={styles.chapterContainer}>
                {[1, 2, 3, 4].map(e => {
                    return <div className={styles.chapter}>
                        <a href="">Chapter {e}</a>
                        <div className={styles.spaceLine}></div>
                        <span className={styles.uploadTime}>2022-03-11</span>
                        <div className={styles.spaceLine}></div>
                        <div className={styles.views}>
                            <FontAwesomeIcon icon={faEye}/>
                            5.000
                        </div>
                    </div>
                })}
            </div>
        </div>

        <div className={styles.commentBlock}>
            <h1 className={styles.header}>Comment</h1>
            <div className={styles.breakLine}></div>

            <form className={styles.commentForm}>
                <input type="text" placeholder='write comment here'/>
                <button type='submit'>send</button>
            </form>

            <div className={styles.commentContainer}>
                
            </div>
        </div>
    </div>
}
export default Comic

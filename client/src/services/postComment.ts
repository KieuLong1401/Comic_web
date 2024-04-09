import axiosInstance from "@/utils/axiosInstance"

interface PostCommentProps {
    comment: string
}

const postComment = async(data: PostCommentProps) => {
    // try{
    //     const res = await axiosInstance({
    //         url: 'addComment',
    //         method: 'POST',
    //         data
    //     })

    //     return res
    // } catch(err) {
    //     console.error(err)
    // }
}

export default postComment
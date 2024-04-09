import axiosInstance from "@/utils/axiosInstance";

const getChapter = async(comicId: string, limit?: number) => {
    try {
        const result = await axiosInstance({
            url: `chapter/${comicId}`,
            method: 'GET',
            params: {
                limit
            }
        })

        return result
    } catch(err) {
        console.log(err)
    }
}

export default getChapter
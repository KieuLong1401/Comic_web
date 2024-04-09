import axiosInstance from "@/utils/axiosInstance";

const getComicDetail = async(comicId: string) => {
    try {
        const result = await axiosInstance({
            url: `comic/${comicId}`,
            method: 'GET',
        })

        return result
    } catch(err) {
        console.log(err)
    }
}

export default getComicDetail
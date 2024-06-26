import axiosInstance from '@/utils/axiosInstance'

const getComicDetail = async (comicId: string) => {
    try {
        const res = await axiosInstance({
            url: `comic/${comicId}`,
            method: 'GET',
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export default getComicDetail

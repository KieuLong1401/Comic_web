import axiosInstance from '@/utils/axiosInstance'

export default async (comicId: string, chapOrder: number) => {
    try {
        const res = await axiosInstance({
            url: 'chapterId',
            method: 'GET',
            params: {
                comicId,
                chapOrder,
            },
        })
        return res.data
    } catch (e) {
        console.error(e)
    }
}

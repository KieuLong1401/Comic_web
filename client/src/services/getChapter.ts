import instance from '@/utils/axiosInstance'

export default async (
    comic_id: string,
    limit: number | undefined = undefined
) => {
    try {
        const result = await instance({
            url: 'chapter/' + comic_id,
            method: 'GET',
            params: {
                limit,
            },
        })
        return result
    } catch (err) {
        console.error(err)
    }
}

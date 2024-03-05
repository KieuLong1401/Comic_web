import instance from '@/utils/axiosInstance'

export default async ({
    type = [],
    sortBy = 'uploaded_time',
    sortType = 'desc',
    pageComicNum = 32,
    page,
}: {
    type: string[]
    sortBy: string
    sortType: string
    pageComicNum: number
    page: number
}) => {
    try {
        const result = await instance({
            url: 'page-num',
            method: 'GET',
            params: {
                type: JSON.stringify(type),
                sortBy,
                sortType,
                pageComicNum,
                page,
            },
        })
        return result
    } catch (err) {
        console.error(err)
    }
}

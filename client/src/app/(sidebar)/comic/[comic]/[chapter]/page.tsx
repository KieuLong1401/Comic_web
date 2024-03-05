const Chapter = ({
    params,
}: {
    params: { comic: string; chapter: string }
}) => {
    return <div>{`chapter ${params.chapter} of ${params.comic}`}</div>
}
export default Chapter

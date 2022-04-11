import Pdf from "./pdf"
import { data } from "./data"
export default function Home() {
    return (
        <>
            <Pdf file={data} />
        </>
    )
}
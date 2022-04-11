/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { toast } from "react-toastify"
import "./preview.scss"
import { Card, Input } from "reactstrap"
import Nextpage from "../components/Icons/Nextpage"
import Lastpage from "../components/Icons/Lastpage"
import Zoomin from "../components/Icons/Zoomin"
import Zoomout from "../components/Icons/Zoomout"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cat.net/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function MyApp({ file = " " }) {
  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(2.3)
  const fileType = file.split(";")[0].split("/")[1]
  const [pageNumberFocus, setPageNumberFocus] = useState(false)
  const [pageNumberInput, setPageNumberInput] = useState(1)
  // console.log(file)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(pageNumber)
  }

  // 上一页 (lastPage)
  function lastPage() {
    if (pageNumber == 1) {
      toast.info("This is the first page", 2)
      return
    }
    const page = pageNumber - 1
    setPageNumber(page)
    setPageNumberInput(page)
  }

  //下一页(nextPage)
  function nextPage() {
    if (pageNumber == numPages) {
      toast.info("This is the last page", 2)
      return
    }
    const page = pageNumber + 1
    setPageNumber(page)
    setPageNumberInput(page)
  }

  // 跳转页面
  function onPageNumberFocus() {
    setPageNumberFocus(true)
  }
  function onPageNumberBlur() {
    setPageNumberFocus(false)
    setPageNumberInput(pageNumber)
  }
  function onPageNumberChange(e) {
    let value = e.target.value
    value = value <= 0 ? 1 : value
    value = value >= numPages ? numPages : value
    setPageNumberInput(value)
  }
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      setPageNumber(Number(e.target.value))
    }
  }

  //缩小(ZoomOut)
  function pageZoomOut() {
    if (scale <= 0.5) {
      toast.info("Zoomed to minimum", 2)
      return
    }
    let newScale = scale - 0.1
    setScale(newScale)
  }

  //放大(ZoomIn)
  function pageZoomIn() {
    if (scale >= 5) {
      return
    }
    let newScale = scale + 0.1
    setScale(newScale)
  }

  return (
    <div className="preview-pdf-wrap">
      <div className="content-wrap">
        {file && (
          <Card className="cardItem" bordered={false}>
            {fileType === "jpg" || fileType === "png" || fileType === "jpeg" ? (
              <div className="img-wrap">
                <img src={file} style={{ width: "100vw" }} alt="Red dot" />
              </div>
            ) : (
              <div className="pageContainer">
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                  {/* {new Array(numPages).fill().map(cur,index) =>} */}
                  <Page pageNumber={pageNumber} scale={scale} />
                </Document>
              </div>
            )}
          </Card>
        )}

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
      {fileType === "pdf" && (
        <div className="footer-wrap">
          <div className="pageTool">
            <div className="btn-wrap" onClick={lastPage} title="last page">
              <Lastpage type="icon-xiayiyehouyiye" />
            </div>
            <Input
              value={pageNumberFocus ? pageNumberInput : pageNumber}
              onFocus={onPageNumberFocus}
              onBlur={onPageNumberBlur}
              onChange={onPageNumberChange}
              onKeyDown={handleKeyDown}
            />
            / {numPages}
            <div className="btn-wrap" onClick={nextPage} title="next page">
              <Nextpage type="icon-xiayiyehouyiye" />
            </div>
            <div className="btn-wrap" onClick={pageZoomIn} title="zoomIn">
              <Zoomout type="plus" />
            </div>
            <div className="btn-wrap" onClick={pageZoomOut} title="zoomOut">
              <Zoomin type="icon-suoxiao1" style={{ textAlign: "center" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyApp

/* eslint-disable react/prop-types */
function PDFViewer({ file }) {
  return (
    <div>
      <object className="mt-[100px]" width="100%" height="800px" data={file} type="application/pdf">   </object>
    </div>
  )
}

export default PDFViewer;
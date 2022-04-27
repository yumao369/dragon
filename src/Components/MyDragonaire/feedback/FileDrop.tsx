
// @ts-ignore
import { Dropzone, FileItem } from "@dropzone-ui/react";
import React, { useState } from "react";

export default function FileDrop (props: {
  style?: React.CSSProperties
}) {
  const {
    style = {}
  } = props
  const [files, setFiles] = useState([] as any[]);
  const updateFiles = (incommingFiles: any[]) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id: any) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  return (
    <Dropzone
      onChange={updateFiles}
      value={files}
      accept={"image/jpeg,image/png"}
      maxFileSize={5242880}
      maxFiles={5}
      label={"Drop some files here or click to select files"}
      minHeight={"135px"}
      maxHeight={"500px"}
      localization={"EN-en"}
      behaviour={"add"}
      color={"#696c6a"}
      disableScroll
      style={style}
    >
      {files.map((file) => (
        <FileItem
          {...file}
          key={file.id}
          onDelete={onDelete}
          localization={"EN-en"}
          preview
          info
          resultOnTooltip
        />
      ))}
    </Dropzone>
  );
}

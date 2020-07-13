import React ,{ Component }from "react"
import { Upload, Button ,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];

const props = {
  action: 'http://172.16.6.11:8888/uploadfile.do',
  listType: 'picture',
  defaultFileList: [...fileList],
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const props2 = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  defaultFileList: [...fileList],
  className: 'upload-list-inline',
};
class TxtImg extends Component{
    
    render() {
     return(
        <div>
        <Upload {...props}>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
        <br />
        {/* <br />
        <Upload {...props2}>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload> */}
      </div>
     )

}
}
export default TxtImg;
import { Button, Divider, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const dummyRequest = ({ onSuccess }) => {
	setTimeout(() => {
		onSuccess("ok");
	}, 0);
};

const ImageModal = ({ isOpen, setIsOpen, refresh, setRefresh }) => {
	const [file, setFile] = useState({ description: "", image: null });

	const createFile = async () => {
		let formData = new FormData();
		const { description, image } = file;
		formData.append("image", image.originFileObj);
		formData.append("description", description);
		await fetch(`${import.meta.env.VITE_API_ENDPOINT}/upload`, {
			method: "POST",
			body: formData,
		});
		setIsOpen(false);
		setRefresh(!refresh);
	};

	const handleOk = () => {
		createFile();
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};

	return (
		<Modal
			title="Create New File"
			open={isOpen}
			onOk={handleOk}
			onCancel={handleCancel}>
			<Divider />
			<TextArea
				placeholder="Description"
				name="description"
				autoSize={{ minRows: 3 }}
				onChange={(e) => setFile({ ...file, description: e.target.value })}
			/>
			<Upload
				accept="image/png, image/jpg, image/jpeg"
				onPreview={handlePreview}
				customRequest={dummyRequest}
				maxCount={1}
				onChange={(info) => setFile({ ...file, image: info.file })}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
		</Modal>
	);
};

export default ImageModal;

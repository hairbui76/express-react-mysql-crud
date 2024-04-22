import { Modal } from "antd";

const OpenImageModal = ({ openImage, setOpenImage, selectId }) => {
	return (
		<Modal
			open={openImage}
			onCancel={() => setOpenImage(false)}
			onOk={() => setOpenImage(false)}>
			<img
				src={`${import.meta.env.VITE_API_ENDPOINT}/file/${selectId}`}
				style={{ width: "100%", objectFit: "contain" }}
			/>
		</Modal>
	);
};

export default OpenImageModal;

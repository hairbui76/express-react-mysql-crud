import { Button, Flex, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageModal from "./ImageModal";
import OpenImageModal from "./OpenImageModal";
import { EyeFilled } from "@ant-design/icons";

const fetchAllFiles = () =>
	fetch(`${import.meta.env.VITE_API_ENDPOINT}/files`).then(async (response) => {
		if (!response.ok) {
			const { message } = await response.json();
			throw new Error(message);
		}
		return response.json();
	});

const App = () => {
	const [files, setFiles] = useState([]);
	const [open, setOpen] = useState(false);
	const [openImage, setOpenImage] = useState(false);
	const [selectId, setSelectId] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const { isPending, data } = useQuery({
		queryKey: ["files", refresh],
		queryFn: fetchAllFiles,
	});

	useEffect(() => {
		if (data) setFiles(data);
	}, [data]);

	if (isPending) return <Skeleton />;

	const columns = [
		{
			title: "Id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "View",
			render: (_, record) => {
				return (
					<Button
						icon={<EyeFilled />}
						type="primary"
						onClick={() => {
							setOpenImage(true);
							setSelectId(record.id);
						}}></Button>
				);
			},
		},
	];

	return (
		<>
			<ImageModal
				isOpen={open}
				setIsOpen={setOpen}
				setRefresh={setRefresh}
				refresh={refresh}
			/>
			<OpenImageModal
				openImage={openImage}
				setOpenImage={setOpenImage}
				selectId={selectId}
			/>
			<Space direction="vertical" style={{ padding: 20, width: "100%" }}>
				<Button onClick={() => setOpen(true)}>Upload new image</Button>
				<Table
					columns={columns}
					dataSource={files.map((file) => ({ ...file, key: file.id }))}
				/>
			</Space>
		</>
	);
};

export default App;

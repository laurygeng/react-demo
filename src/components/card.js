import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './index.less';

export default function Card(props) {
	const {
		index,
		cardItem,
		cardItem: { abbr, name, email, address },
		deleteList,
		editList,
		searchVal,
	} = props;
	const [form] = Form.useForm();
	const [isShowSaveBtn, setShowSaveBtn] = useState(false);
	const edit = () => {
		setShowSaveBtn(true);
	};
	const renderKeyWordsHighLight = (keyWords, searchObj) => {
		const reg = new RegExp(keyWords, 'ig');
		if (keyWords === '') {
			return (
				<React.Fragment>
					<div>{name}</div>
					<div>{email}</div>
					<div>{address}</div>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<div>
						{name.split('').map((item, index) => {
							return (
								<React.Fragment key={index}>
									<span style={{ color: item.match(reg) ? 'red' : '' }}>
										{item}
									</span>
								</React.Fragment>
							);
						})}
					</div>
					<div>
						{email.split('').map((item, index, arr) => {
							return (
								<React.Fragment key={index}>
									<span style={{ color: item.match(reg) ? 'red' : '' }}>
										{item}
									</span>
								</React.Fragment>
							);
						})}
					</div>
					<div>
						{address.split('').map((item, index) => {
							return (
								<React.Fragment key={index}>
									<span style={{ color: item.match(reg) ? 'red' : '' }}>
										{item}
									</span>
								</React.Fragment>
							);
						})}
					</div>
				</React.Fragment>
			);
		}
	};

	return (
		<span className='card'>
			<div className='abbr'>{abbr}</div>
			{!isShowSaveBtn ? (
				renderKeyWordsHighLight(searchVal, cardItem)
			) : (
				<Form
					size='small'
					form={form}
					name='addresslist'
					autoComplete='off'
					initialValues={{ name, email, address }}
				>
					<Form.Item
						label='name'
						name='name'
						style={{ display: 'inline-flex' }}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='email'
						name='email'
						style={{ display: 'inline-flex' }}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='address'
						name='address'
						style={{ display: 'inline-flex' }}
					>
						<Input />
					</Form.Item>
				</Form>
			)}

			<div className='btn-wrap'>
				{isShowSaveBtn ? (
					<Button
						type='primary'
						size='small'
						onClick={() => {
							setShowSaveBtn(false);
							editList(form.getFieldsValue(), index);
						}}
					>
						save
					</Button>
				) : (
					<Button type='primary' size='small' onClick={edit}>
						edit
					</Button>
				)}
				<Button
					className='del-btn'
					type='primary'
					size='small'
					onClick={() => {
						deleteList(index);
					}}
				>
					Delete
				</Button>
			</div>
		</span>
	);
}

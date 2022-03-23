import React, { useState } from 'react';
import { Input, Button } from 'antd';
import Card from '../components/card.js';
import './index.less';

export default function AddressBook(props) {
	const [searchVal, setSearchVal] = useState('');
	const [addressList, setAddressList] = useState([
		{
			abbr: 'D',
			name: 'David',
			email: 'David.wang@126.com',
			address: 'shanghai',
		},
		{
			abbr: 'A',
			name: 'Aron',
			email: 'Aron.wang@126.com',
			address: 'shanghai',
		},
		{
			abbr: 'B',
			name: 'Brown',
			email: 'Brown.wang@126.com',
			address: 'shanghai',
		},
		{
			abbr: 'C',
			name: 'Crown',
			email: 'Crown.wang@126.com',
			address: 'shanghai',
		},
		{
			abbr: 'E',
			name: 'Eric',
			email: 'Eric.wang@126.com',
			address: 'shanghai',
		},
	]);
	const addItem = () => {
		setAddressList(
			addressList.concat([
				{
					abbr: '',
					name: '',
					email: '',
					address: '',
				},
			])
		);
	};
	const sortBy = (attr, rev) => {
		if (rev === undefined) {
			rev = 1;
		} else {
			rev = rev ? 1 : -1;
		}
		return (a, b) => {
			a = a[attr];
			b = b[attr];
			if (a < b) {
				return rev * -1;
			}
			if (a > b) {
				return rev * 1;
			}
			return 0;
		};
	};
	const filter = (payload) => {
		if (payload === 'ASC') {
			setAddressList((addressList) => {
				let tempList = JSON.parse(JSON.stringify(addressList));
				tempList.sort(sortBy('name'));
				return tempList;
			});
		} else if (payload === 'DESC') {
			setAddressList((addressList) => {
				let tempList = JSON.parse(JSON.stringify(addressList));
				tempList.sort(sortBy('name', false));
				return tempList;
			});
		}
	};
	const onChange = ({ target: { value } }) => {
		setSearchVal(value);
	};
	const deleteList = (index) => {
		setAddressList(
			addressList.filter((_, i) => {
				return index !== i;
			})
		);
	};
	const editList = (payload, index) => {
		let { name } = payload;
		payload.abbr = name.substr(0, 1).toUpperCase();
		setAddressList((addressList) => {
			let tempList = JSON.parse(JSON.stringify(addressList));
			tempList.splice(index, 1, payload);
			return tempList;
		});
	};

	return (
		<div>
			<h3>Address Book</h3>
			<div>
				<Button onClick={addItem}>Add Address Item</Button>
				<Button
					onClick={() => {
						filter('ASC');
					}}
				>
					A-Z
				</Button>
				<Button
					onClick={() => {
						filter('DESC');
					}}
				>
					Z-A
				</Button>
				<Input
					value={searchVal}
					onChange={onChange}
					className='search'
					placeholder='Enter KeyWords to Search'
				/>
			</div>
			<div className='card-wrap'>
				{addressList.map((item, index) => {
					return (
						<Card
							key={index}
							index={index}
							cardItem={item}
							deleteList={deleteList}
							editList={editList}
							searchVal={searchVal}
						></Card>
					);
				})}
			</div>
		</div>
	);
}

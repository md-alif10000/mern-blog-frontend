import React from "react";
import { Link } from "react-router-dom";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

export default function Pagination({ url, perPage, count, page }) {
	let totalPage = Math.ceil(count / perPage);

	
	let startLoop = page;

	let diff = totalPage - page;

	if (diff <= 3) {
		startLoop = totalPage - 3;
	}
	let endLoop = startLoop + 3;
	if (startLoop <= 0) {
		startLoop = 1;
	}

	const links = () => {
		const store = [];
		for (let i = startLoop; i <= endLoop; i++) {
			store.push(
				<li key={i} className={i==page? 'active ':'inactive'}>
					<Link to={`${url}/${i}`}> {i}</Link>
				</li>
			);
		}
		console.log("alif");
		return store;
	};

	const next = () => {
		if (page < totalPage) {
			return (
				<li className='next'>
					<Link to={`${url}/${page+1}`}>
						<BsChevronDoubleRight />
					</Link>{" "}
				</li>
			);
		}
	};
		const prev = () => {
			if (page >1) {
				
				return (
					<li className='prev'>
						<Link to={`${url}/${page - 1}`}>
							<BsChevronDoubleLeft />
						</Link>{" "}
					</li>
				);
			}
		};
	return totalPage ? <div className='pagination'>{prev()} {links()} {next()} </div>:''
}

import React from 'react';
//import './ImageLinkForm.css';
const ImageLinkForm = ({ onFileChange, onSubmit }) => {
	return (
		<div>
			<div >
				<div >
					<div >
						<input type='file' onChange={onFileChange} />
					</div>
					<button
						onClick={onSubmit}
					
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	)
}


export default ImageLinkForm;

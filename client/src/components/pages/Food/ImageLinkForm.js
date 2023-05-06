import React from 'react';

const ImageLinkForm = ({ onFileChange, onSubmit }) => {
	return (
		<div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', marginBottom: '20px' }}>
			<div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '260px' }}>
				<div>
					<input type='file' onChange={onFileChange} style={{ display: 'none' }} id="upload-file" />
					<label htmlFor="upload-file" style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}>
						Choisir un fichier
					</label>
				</div>
				<button
					onClick={onSubmit}
					style={{ marginLeft: '16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}
				>
					Detect
				</button>
			</div>
		</div>
	)
}


export default ImageLinkForm;


function DressCodeModal({ onClose }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white p-6 rounded shadow-lg max-w-sm w-full max-h-full overflow-y-auto">
				<h3 className="text-lg font-bold mb-4">Dress Code</h3>
				<p className="mb-2">
					<strong>Wedding colours:</strong>
					<br />
					<span className="flex items-center">
						<span
							className="inline-block w-4 h-4 mr-2 rounded-full"
							style={{ backgroundColor: "#411900" }} // Chocolate Brown color code
						></span>
						<p>CHOCOLATE BROWN</p> (Bride)
					</span>
					<span className="flex items-center">
						<span
							className="inline-block w-4 h-4 mr-2 rounded-full"
							style={{ backgroundColor: "#00674F" }} // Emerald Green color code
						></span>
						<p> EMERALD GREEN</p> (Groom)
					</span>
				</p>
				<p className="mb-2">
					Please kindly let us know if you are interested in participating in
					ASO EBI (TRADITIONAL ATTIRE). Information is as follows:
				</p>

				<h4 className="text-md font-bold mt-4 mb-2">What is available</h4>
				<p className="mb-2">
					<strong>Women:</strong> Complete set including Lace, Aso Oke, Gele &
					Ipele
				</p>
				<p className="mb-2">
					<strong>Men:</strong> Complete set Ankara & Cap
				</p>
				<p className="mb-2">
					<strong>Women:</strong> Gele & Ipele
				</p>
				<p className="mb-2">
					<strong>Men:</strong> Cap
				</p>
				<h4 className="text-md font-bold mt-4 mb-2">Who to contact</h4>
				<p className="mb-2">
					<strong>For Brides Family Asoebi contact:</strong> Mrs Pelumi
					Osibemekun
				</p>
				<p className="mb-2">
					<strong>For Grooms family Asoebi contact:</strong> Mrs Funke Oyediran
				</p>
				<p className="mb-2">
					<strong>Groom:</strong> Mr Toluwanimi Oyediran
				</p>
				<p className="mb-2">
					<strong>Bride:</strong> Miss Opeoluwa Osibemekun
				</p>

				<button
					className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default DressCodeModal;

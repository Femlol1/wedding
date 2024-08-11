function DressCodeModal({ onClose }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white p-6 rounded shadow-lg max-w-sm w-full max-h-full overflow-y-auto">
				<h3 className="text-lg font-bold mb-4">Dress Code</h3>
				<p className="mb-2">
					<strong>Wedding colours:</strong> Emerald or Chocolate
				</p>
				<p className="mb-2">
					Please kindly let us know if you are interested in participating in
					ASO EBI (TRADITIONAL ATTIRE). Information is as follows:
				</p>
				<p className="mb-2">
					<strong>For Brides Family Asoebi contact:</strong> Pelumi Osibemekun
				</p>
				<p className="mb-2">
					<strong>For Grooms family Asoebi contact:</strong> Funke Oyediran
				</p>

				<h4 className="text-md font-bold mt-4 mb-2">Cost estimates</h4>
				<p className="mb-2">
					<strong>Women:</strong> Complete set including Lace, Aso Oke, Gele &
					Ipele
				</p>
				<p className="mb-2">
					<strong>Men:</strong> Complete set Ankara + Cap
				</p>
				<p className="mb-2">
					<strong>Gele & Ipele:</strong>
				</p>
				<p className="mb-2">
					<strong>Cap:</strong>
				</p>

				<h4 className="text-md font-bold mt-4 mb-2">Payment</h4>
				<p className="mb-2">
					<strong>USA:</strong>
				</p>
				<p className="mb-2">
					<strong>UK:</strong>
				</p>
				<p className="mb-2">
					<strong>Nigeria:</strong>
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

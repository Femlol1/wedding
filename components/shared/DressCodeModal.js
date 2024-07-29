function DressCodeModal({ onClose }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
				<h3 className="text-lg font-bold">Dress Code</h3>
				<p>Chocolate and Gold or Emerald and Gold</p>
				<button
					className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
}
export default DressCodeModal;

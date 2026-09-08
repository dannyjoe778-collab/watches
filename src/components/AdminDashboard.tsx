import React, { useState } from 'react';
import { Product, ConsultationRequest, Order, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { WatermarkedProductImage } from './WatermarkedProductImage';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Sliders,
  DollarSign,
  Lock,
  ArrowLeft
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  consultations: ConsultationRequest[];
  currency: CurrencyCode;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateConsultationStatus: (id: string, status: ConsultationRequest['status']) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  consultations,
  currency,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateConsultationStatus,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'consultations' | 'new-product'>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newBrand, setNewBrand] = useState('Rolex');
  const [newName, setNewName] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newType, setNewType] = useState<'watch' | 'jewellery'>('watch');
  const [newPriceEUR, setNewPriceEUR] = useState(15000);
  const [newStatus, setNewStatus] = useState<Product['status']>('Available');
  const [newBadge, setNewBadge] = useState<Product['badge']>('AUTHENTICATED');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80');
  const [newDesc, setNewDesc] = useState('');
  const [newRef, setNewRef] = useState('');
  const [newCondition, setNewCondition] = useState('Exceptional');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `${newBrand.toLowerCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`;
    const product: Product = {
      id,
      name: newName,
      brand: newBrand,
      model: newModel || newName,
      type: newType,
      category: newType === 'watch' ? 'Luxury Sports Watch' : 'High Jewellery',
      collection: `${newBrand} Vault Collection`,
      priceEUR: Number(newPriceEUR),
      status: newStatus,
      badge: newBadge,
      images: [newImage],
      description: newDesc || `Authentic ${newBrand} ${newName} verified by Aurelia & Crown horological workshop.`,
      isSampleListing: false,
      createdAt: new Date().toISOString(),
      ...(newType === 'watch' ? {
        watchSpecs: {
          reference: newRef || 'Ref-Custom',
          condition: (newCondition as any) || 'Exceptional',
          year: '2023',
          movement: 'Automatic In-House Calibre',
          caseMaterial: 'Oystersteel',
          bracelet: 'Oystersteel Luxury Bracelet',
          caseSize: '40mm',
          box: true,
          papers: true,
          serialNumberStatus: 'Verified against registry',
          provenanceNotes: 'Estate acquisition verified'
        }
      } : {
        jewellerySpecs: {
          material: '18K Gold',
          box: true,
          papers: true,
          provenanceNotes: 'Estate allocation'
        }
      })
    };

    onAddProduct(product);
    setActiveTab('inventory');
    // Reset
    setNewName('');
    setNewModel('');
    setNewRef('');
  };

  const totalRevenueEUR = orders.reduce((sum, o) => sum + o.totalAmountEUR, 0);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE7DE]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] bg-[#16181A] text-[#E5D3B3] px-2.5 py-0.5 font-semibold">
                Internal Vault Portal
              </span>
              <span className="text-xs text-neutral-500 font-mono">AURELIA & CROWN ERP v2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#16181A] mt-1">
              Curator & Inventory Dashboard
            </h1>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs uppercase tracking-wider bg-white border border-[#EBE7DE] hover:border-[#8C6D37] px-4 py-2.5 font-medium transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Boutique</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 border border-[#EBE7DE] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Total Catalog Items</span>
              <span className="text-2xl font-serif text-[#16181A] font-medium">{products.length}</span>
            </div>
            <Package className="w-8 h-8 text-[#8C6D37]/40" />
          </div>

          <div className="bg-white p-5 border border-[#EBE7DE] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Active Orders</span>
              <span className="text-2xl font-serif text-[#16181A] font-medium">{orders.length}</span>
            </div>
            <ShoppingBag className="w-8 h-8 text-[#8C6D37]/40" />
          </div>

          <div className="bg-white p-5 border border-[#EBE7DE] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Consultation Inquiries</span>
              <span className="text-2xl font-serif text-[#16181A] font-medium">{consultations.length}</span>
            </div>
            <Users className="w-8 h-8 text-[#8C6D37]/40" />
          </div>

          <div className="bg-white p-5 border border-[#EBE7DE] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Portfolio Order Volume</span>
              <span className="text-2xl font-serif text-[#16181A] font-medium">{formatPrice(totalRevenueEUR, currency)}</span>
            </div>
            <TrendingUp className="w-8 h-8 text-[#8C6D37]/40" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EBE7DE] gap-2 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-4 transition-colors whitespace-nowrap ${
              activeTab === 'inventory' 
                ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Inventory Management ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 transition-colors whitespace-nowrap ${
              activeTab === 'orders' 
                ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Acquisition Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`pb-3 px-4 transition-colors whitespace-nowrap ${
              activeTab === 'consultations' 
                ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Private Client Requests ({consultations.length})
          </button>
          <button
            onClick={() => setActiveTab('new-product')}
            className={`pb-3 px-4 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'new-product' 
                ? 'text-[#8C6D37] border-b-2 border-[#8C6D37]' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Catalogue New Piece</span>
          </button>
        </div>

        {/* TAB 1: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-[#EBE7DE] shadow-xs overflow-hidden">
            <div className="p-4 bg-[#FAF8F5] border-b border-[#EBE7DE] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                Active Catalog Pieces
              </span>
              <button
                onClick={() => setActiveTab('new-product')}
                className="bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EBE7DE] bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-neutral-500">
                    <th className="p-3">Piece Details</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Reference / Metal</th>
                    <th className="p-3">Price (EUR)</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Badge</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DE] text-neutral-700">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 border border-[#EBE7DE] overflow-hidden flex-shrink-0">
                            <WatermarkedProductImage src={p.images[0]} alt={p.name} className="w-full h-full object-cover" watermarkSize="xs" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#8C6D37] block">{p.brand}</span>
                            <span className="font-serif font-medium text-neutral-900 block">{p.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 uppercase text-[10px]">{p.type}</td>
                      <td className="p-3 font-mono text-[11px]">{p.watchSpecs?.reference || p.jewellerySpecs?.material || 'N/A'}</td>
                      <td className="p-3 font-semibold text-neutral-900">{formatPrice(p.priceEUR, currency)}</td>
                      <td className="p-3">
                        <select
                          value={p.status}
                          onChange={(e) => onUpdateProduct({ ...p, status: e.target.value as any })}
                          className="bg-[#FAF8F5] border border-[#EBE7DE] text-[11px] p-1 focus:outline-none"
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                          <option value="New">New</option>
                          <option value="Coming Soon">Coming Soon</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <select
                          value={p.badge}
                          onChange={(e) => onUpdateProduct({ ...p, badge: e.target.value as any })}
                          className="bg-[#FAF8F5] border border-[#EBE7DE] text-[11px] p-1 focus:outline-none"
                        >
                          <option value="AUTHENTICATED">AUTHENTICATED</option>
                          <option value="CERTIFIED">CERTIFIED</option>
                          <option value="PRIVATE SALE">PRIVATE SALE</option>
                          <option value="SAMPLE LISTING">SAMPLE LISTING</option>
                          <option value="NEW">NEW</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 hover:text-[#8C6D37] transition-colors"
                            title="Edit Price & Specs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 hover:text-red-700 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Orders Manager */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#EBE7DE] shadow-xs">
            <div className="p-4 bg-[#FAF8F5] border-b border-[#EBE7DE]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                Live Acquisition Orders
              </h3>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 text-xs">
                No active orders recorded yet. Place an order through checkout to see it logged here in real-time.
              </div>
            ) : (
              <div className="divide-y divide-[#EBE7DE]">
                {orders.map((order) => (
                  <div key={order.id} className="p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-mono font-semibold text-xs text-neutral-900">
                          Order #{order.id}
                        </span>
                        <span className="text-[11px] text-neutral-500 ml-2">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-neutral-900">
                          {formatPrice(order.totalAmountEUR, order.currency)}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                          className="bg-[#FAF8F5] border border-[#EBE7DE] text-xs p-1 font-medium"
                        >
                          <option value="Pending Verification">Pending Verification</option>
                          <option value="Payment Confirmed">Payment Confirmed</option>
                          <option value="Insured In Transit">Insured In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-600 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#FAF8F5] p-3 border border-[#EBE7DE]">
                      <div><strong>Client:</strong> {order.customer.fullName} ({order.customer.email})</div>
                      <div><strong>Country:</strong> {order.customer.country}</div>
                      <div><strong>Protocol:</strong> {order.paymentMethod}</div>
                    </div>

                    <div className="text-xs">
                      <strong>Items ({order.items.length}):</strong>{' '}
                      {order.items.map(i => `${i.quantity}x ${i.product.brand} ${i.product.name}`).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Consultations Manager */}
        {activeTab === 'consultations' && (
          <div className="bg-white border border-[#EBE7DE] shadow-xs">
            <div className="p-4 bg-[#FAF8F5] border-b border-[#EBE7DE]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                Private Client Concierge Requests
              </h3>
            </div>

            {consultations.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 text-xs">
                No consultation requests submitted yet. Use the "Private Client Services" or product consultation forms to see them recorded here.
              </div>
            ) : (
              <div className="divide-y divide-[#EBE7DE]">
                {consultations.map((c) => (
                  <div key={c.id} className="p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-semibold text-xs text-neutral-900">{c.fullName}</span>
                        <span className="text-[11px] text-neutral-500 ml-2">({c.country} • {c.email} • {c.phone})</span>
                      </div>

                      <select
                        value={c.status}
                        onChange={(e) => onUpdateConsultationStatus(c.id, e.target.value as any)}
                        className="bg-[#FAF8F5] border border-[#EBE7DE] text-xs p-1"
                      >
                        <option value="New">New Request</option>
                        <option value="In Progress">Specialist Assigned</option>
                        <option value="Completed">Completed / Handled</option>
                      </select>
                    </div>

                    <div className="text-xs bg-[#FAF8F5] p-3 border border-[#EBE7DE] space-y-1">
                      <div className="flex justify-between">
                        <span><strong>Inquiry Type:</strong> {c.interestedCategory}</span>
                        <span><strong>Budget:</strong> {c.budget || 'Not specified'}</span>
                      </div>
                      {c.productName && (
                        <div><strong>Referenced Piece:</strong> {c.productName}</div>
                      )}
                      <div className="pt-1 text-neutral-700 italic">
                        "{c.message}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: New Product Form */}
        {activeTab === 'new-product' && (
          <div className="bg-white p-6 sm:p-8 border border-[#EBE7DE] shadow-xs max-w-2xl mx-auto space-y-6">
            <div className="border-b border-[#EBE7DE] pb-4">
              <h3 className="text-xl font-serif text-[#16181A]">
                Catalogue New Timepiece or Fine Jewellery Piece
              </h3>
              <p className="text-xs text-neutral-500">
                Direct entry into live Aurelia & Crown boutique inventory.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Maison</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Submariner Date 41"
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  >
                    <option value="watch">Luxury Watch</option>
                    <option value="jewellery">Fine Jewellery</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Price in EUR</label>
                  <input
                    type="number"
                    required
                    value={newPriceEUR}
                    onChange={(e) => setNewPriceEUR(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Badge</label>
                  <select
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  >
                    <option value="AUTHENTICATED">AUTHENTICATED</option>
                    <option value="CERTIFIED">CERTIFIED</option>
                    <option value="PRIVATE SALE">PRIVATE SALE</option>
                    <option value="NEW">NEW</option>
                    <option value="SAMPLE LISTING">SAMPLE LISTING</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Reference / Model Code</label>
                  <input
                    type="text"
                    value={newRef}
                    onChange={(e) => setNewRef(e.target.value)}
                    placeholder="e.g. 126610LN"
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Condition Rating</label>
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="e.g. Unworn / Mint"
                    className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-700 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Comprehensive dossier description..."
                  className="w-full bg-[#FAF8F5] border border-[#EBE7DE] p-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#16181A] hover:bg-[#8C6D37] text-[#FAF8F5] py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Publish Piece to Catalogue
              </button>
            </form>
          </div>
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-[#111315]/80" onClick={() => setEditingProduct(null)} />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white border border-[#EBE7DE] max-w-md w-full p-6 space-y-4 text-xs">
                <h3 className="text-lg font-serif text-[#16181A]">
                  Edit {editingProduct.brand} {editingProduct.name}
                </h3>

                <div>
                  <label className="block font-medium mb-1">Price (EUR)</label>
                  <input
                    type="number"
                    value={editingProduct.priceEUR}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceEUR: Number(e.target.value) })}
                    className="w-full border border-[#EBE7DE] p-2"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Status</label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                    className="w-full border border-[#EBE7DE] p-2"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                    <option value="New">New</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-[#EBE7DE]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onUpdateProduct(editingProduct);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 bg-[#16181A] text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ProductCard from './ProductCard';
import './Product.css';

const ITEMS_PER_PAGE = 12; // As requested

const ProductList = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { resetSearch } = useData();

    if (!products || products.length === 0) {
        return (
            <div className="no-products-found" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                <h3>Nenašli sa žiadne produkty</h3>
                <p>Skúste zmeniť kritériá vyhľadávania alebo odstrániť filtre.</p>
                <button
                    onClick={() => resetSearch()}
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#213547',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Obnoviť zoznam produktov
                </button>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <div className="product-grid">
                {currentProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        &laquo; Predchádzajúca
                    </button>

                    <span className="page-info">
                        Strana {currentPage} z {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Ďalšia &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;

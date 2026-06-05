import { useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { getCategories, getProducts } from "../api/productApi";

import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ProductListing = () => {
    const { filters, setFilters, searchQuery } = useContext(ProductContext);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const PRODUCTS_PER_PAGE = 12;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");

            const [productsResponse, categoriesResponse] =
                await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);

            setProducts(productsResponse.products || []);
            setCategories(categoriesResponse || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filters, searchQuery]);

    const brands = useMemo(() => {
        return [
            ...new Set(
                products
                    .map((product) => product.brand)
                    .filter(Boolean)
            ),
        ].sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const categoryMatch =
                !filters.category ||
                product.category === filters.category;

            const brandMatch =
                filters.brand.length === 0 ||
                filters.brand.includes(product.brand);

            const minPriceMatch =
                !filters.minPrice ||
                product.price >= Number(filters.minPrice);

            const maxPriceMatch =
                !filters.maxPrice ||
                product.price <= Number(filters.maxPrice);

            const searchMatch =
                !searchQuery ||
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

            return (
                categoryMatch &&
                brandMatch &&
                minPriceMatch &&
                maxPriceMatch &&
                searchMatch
            );
        });
    }, [products, filters, searchQuery]);

    const totalPages = Math.ceil(
        filteredProducts.length / PRODUCTS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * PRODUCTS_PER_PAGE;

    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="container">
            <Filters
                categories={categories}
                brands={brands}
                filters={filters}
                setFilters={setFilters}
            />

            <div className="content">
                <h2>
                    Products ({filteredProducts.length})
                </h2>

                {filteredProducts.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <>
                        <div className="grid">
                            {paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductListing;
import { useState, useEffect } from "react";
import axios from "axios";

const useAllTest = (initialPage = 0, initialSize = 8) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchTests = async (page = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/tests?page=${page}&size=${initialSize}`
      );

      if (page === 0) {
        setTests(response.data.tests);
      } else {
        setTests((prev) => [...prev, ...response.data.tests]);
      }

      setCurrentPage(response.data.currentPage);
      setHasMore(response.data.currentPage < response.data.totalPages - 1);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchTests(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchTests(0);
  }, []);

  return { tests, loading, error, hasMore, loadMore };
};

export default useAllTest;

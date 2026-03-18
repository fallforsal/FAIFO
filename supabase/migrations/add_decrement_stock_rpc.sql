-- RPC function to safely decrement stock_quantity for a product.
-- Prevents stock from going below 0.
CREATE OR REPLACE FUNCTION decrement_stock(p_product_id UUID, p_quantity INT)
RETURNS VOID AS $$
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id
      AND stock_quantity >= p_quantity;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Insufficient stock for product %', p_product_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

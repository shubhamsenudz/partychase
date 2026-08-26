CREATE TABLE tenants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    created_at VARCHAR(40)
);
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(40),
    created_at VARCHAR(40)
);
CREATE UNIQUE INDEX ux_users_email ON users(email);

CREATE TABLE parties (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    name VARCHAR(255),
    phone VARCHAR(255),
    city VARCHAR(255),
    credit_days INT,
    created_at VARCHAR(40)
);

CREATE TABLE invoices (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    party_id BIGINT,
    invoice_no VARCHAR(255),
    amount INT,
    outstanding INT,
    due_on VARCHAR(255),
    created_at VARCHAR(40)
);

CREATE TABLE promises (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    invoice_id BIGINT,
    promise_on VARCHAR(255),
    note VARCHAR(255),
    status VARCHAR(255),
    created_at VARCHAR(40)
);

CREATE TABLE collections (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    invoice_id BIGINT,
    amount INT,
    mode VARCHAR(255),
    created_at VARCHAR(40)
);

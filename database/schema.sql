CREATE TABLE IF NOT EXISTS people (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120) NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(1000) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NULL
);

CREATE INDEX IF NOT EXISTS ix_people_created_at 
ON people(created_at);

CREATE INDEX IF NOT EXISTS ix_people_full_name 
ON people(first_name, last_name);

INSERT INTO people (first_name, last_name, birth_date, address)
VALUES
('John', 'Smith', '1995-03-15', 'New York, USA'),
('Emma', 'Johnson', '1998-07-21', 'Los Angeles, USA'),
('Michael', 'Brown', '1992-11-08', 'Chicago, USA'),
('Sophia', 'Davis', '2001-01-30', 'Miami, USA'),
('Daniel', 'Wilson', '1997-09-12', 'Dallas, USA'),
('Olivia', 'Taylor', '1994-06-25', 'Seattle, USA'),
('James', 'Anderson', '1999-12-10', 'San Francisco, USA'),
('Isabella', 'Thomas', '1993-04-18', 'Boston, USA'),
('William', 'Jackson', '1990-08-05', 'Houston, USA'),
('Mia', 'White', '2002-02-14', 'Phoenix, USA'),
('Alexander', 'Harris', '1996-10-09', 'Denver, USA'),
('Charlotte', 'Martin', '1991-05-27', 'Atlanta, USA'),
('Benjamin', 'Thompson', '1998-03-03', 'Austin, USA'),

ON CONFLICT DO NOTHING;
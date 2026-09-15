-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Admins Table
create table if not exists admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text default 'admin' check (role in ('admin', 'superadmin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Destinations Table
create table if not exists destinations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  state text not null,
  description text,
  best_time_to_visit text,
  travel_info text,
  main_image text,
  is_published boolean default false,
  meta_title text,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Destination Images
create table if not exists destination_images (
  id uuid primary key default uuid_generate_v4(),
  destination_id uuid references destinations(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tours Table
create table if not exists tours (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  destination_id uuid references destinations(id) on delete set null,
  duration_days integer not null,
  duration_nights integer not null,
  starting_price numeric not null,
  short_description text,
  full_description text,
  highlights text[],
  places_covered text[],
  itinerary jsonb, -- Array of objects: {day: 1, title: "", description: ""}
  inclusions text[],
  exclusions text[],
  main_image text,
  is_published boolean default false,
  meta_title text,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tour Images
create table if not exists tour_images (
  id uuid primary key default uuid_generate_v4(),
  tour_id uuid references tours(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Taxi Vehicles Table
create table if not exists taxi_vehicles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  vehicle_type text not null,
  seating_capacity integer not null,
  description text,
  features text[],
  price_per_day numeric,
  price_per_km numeric,
  main_image text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Taxi Images
create table if not exists taxi_images (
  id uuid primary key default uuid_generate_v4(),
  taxi_id uuid references taxi_vehicles(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Tempo Travellers Table
create table if not exists tempo_vehicles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  vehicle_type text not null,
  seating_capacity integer not null,
  description text,
  features text[],
  price_per_day numeric,
  price_per_km numeric,
  main_image text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tempo Images
create table if not exists tempo_images (
  id uuid primary key default uuid_generate_v4(),
  tempo_id uuid references tempo_vehicles(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Bookings & Enquiries
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  phone text not null,
  email text,
  booking_type text not null check (booking_type in ('tour', 'taxi', 'tempo')),
  reference_id uuid, -- Can link to tour_id, taxi_id, or tempo_id
  destination text,
  travel_date date not null,
  return_date date,
  number_of_travelers integer,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  subject text,
  message text not null,
  status text default 'new' check (status in ('new', 'contacted', 'resolved')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Gallery
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  title text,
  image_url text not null,
  category text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Testimonials
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  location text,
  rating integer check (rating >= 1 and rating <= 5),
  review_text text not null,
  image_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Site Settings & Homepage CMS
create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Function to automatically update 'updated_at'
create or replace function update_modified_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Drop triggers if they exist to prevent duplication on multiple runs
drop trigger if exists update_destinations_modtime on destinations;
drop trigger if exists update_tours_modtime on tours;
drop trigger if exists update_taxi_vehicles_modtime on taxi_vehicles;
drop trigger if exists update_tempo_vehicles_modtime on tempo_vehicles;
drop trigger if exists update_site_settings_modtime on site_settings;

-- Apply triggers
create trigger update_destinations_modtime before update on destinations for each row execute procedure update_modified_column();
create trigger update_tours_modtime before update on tours for each row execute procedure update_modified_column();
create trigger update_taxi_vehicles_modtime before update on taxi_vehicles for each row execute procedure update_modified_column();
create trigger update_tempo_vehicles_modtime before update on tempo_vehicles for each row execute procedure update_modified_column();
create trigger update_site_settings_modtime before update on site_settings for each row execute procedure update_modified_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
alter table admins enable row level security;
alter table destinations enable row level security;
alter table destination_images enable row level security;
alter table tours enable row level security;
alter table tour_images enable row level security;
alter table taxi_vehicles enable row level security;
alter table taxi_images enable row level security;
alter table tempo_vehicles enable row level security;
alter table tempo_images enable row level security;
alter table gallery enable row level security;
alter table testimonials enable row level security;
alter table bookings enable row level security;
alter table enquiries enable row level security;
alter table site_settings enable row level security;

-- Function to check admin status
create or replace function is_admin() returns boolean as $$
  select exists(select 1 from admins where id = auth.uid());
$$ language sql security definer;

-- Drop existing policies to prevent errors when re-running
drop policy if exists "Admins can view their own record" on admins;
drop policy if exists "Public can view published destinations" on destinations;
drop policy if exists "Admins can do all on destinations" on destinations;
drop policy if exists "Public can view destination images" on destination_images;
drop policy if exists "Admins can do all on destination images" on destination_images;
drop policy if exists "Public can view published tours" on tours;
drop policy if exists "Admins can do all on tours" on tours;
drop policy if exists "Public can view tour images" on tour_images;
drop policy if exists "Admins can do all on tour images" on tour_images;
drop policy if exists "Public can view published taxis" on taxi_vehicles;
drop policy if exists "Admins can do all on taxis" on taxi_vehicles;
drop policy if exists "Public can view taxi images" on taxi_images;
drop policy if exists "Admins can do all on taxi images" on taxi_images;
drop policy if exists "Public can view published tempos" on tempo_vehicles;
drop policy if exists "Admins can do all on tempos" on tempo_vehicles;
drop policy if exists "Public can view tempo images" on tempo_images;
drop policy if exists "Admins can do all on tempo images" on tempo_images;
drop policy if exists "Public can view gallery" on gallery;
drop policy if exists "Admins can do all on gallery" on gallery;
drop policy if exists "Public can view published testimonials" on testimonials;
drop policy if exists "Admins can do all on testimonials" on testimonials;
drop policy if exists "Public can insert bookings" on bookings;
drop policy if exists "Admins can do all on bookings" on bookings;
drop policy if exists "Public can insert enquiries" on enquiries;
drop policy if exists "Admins can do all on enquiries" on enquiries;
drop policy if exists "Public can view site settings" on site_settings;
drop policy if exists "Admins can do all on site settings" on site_settings;

-- Admins Table
create policy "Admins can view their own record" on admins for select using (auth.uid() = id);

-- Destinations
create policy "Public can view published destinations" on destinations for select using (is_published = true);
create policy "Admins can do all on destinations" on destinations for all using (is_admin());

-- Destination Images
create policy "Public can view destination images" on destination_images for select using (true);
create policy "Admins can do all on destination images" on destination_images for all using (is_admin());

-- Tours
create policy "Public can view published tours" on tours for select using (is_published = true);
create policy "Admins can do all on tours" on tours for all using (is_admin());

-- Tour Images
create policy "Public can view tour images" on tour_images for select using (true);
create policy "Admins can do all on tour images" on tour_images for all using (is_admin());

-- Taxi Vehicles
create policy "Public can view published taxis" on taxi_vehicles for select using (is_published = true);
create policy "Admins can do all on taxis" on taxi_vehicles for all using (is_admin());

-- Taxi Images
create policy "Public can view taxi images" on taxi_images for select using (true);
create policy "Admins can do all on taxi images" on taxi_images for all using (is_admin());

-- Tempo Vehicles
create policy "Public can view published tempos" on tempo_vehicles for select using (is_published = true);
create policy "Admins can do all on tempos" on tempo_vehicles for all using (is_admin());

-- Tempo Images
create policy "Public can view tempo images" on tempo_images for select using (true);
create policy "Admins can do all on tempo images" on tempo_images for all using (is_admin());

-- Gallery
create policy "Public can view gallery" on gallery for select using (true);
create policy "Admins can do all on gallery" on gallery for all using (is_admin());

-- Testimonials
create policy "Public can view published testimonials" on testimonials for select using (is_published = true);
create policy "Admins can do all on testimonials" on testimonials for all using (is_admin());

-- Bookings
create policy "Public can insert bookings" on bookings for insert with check (true);
create policy "Admins can do all on bookings" on bookings for all using (is_admin());

-- Enquiries
create policy "Public can insert enquiries" on enquiries for insert with check (true);
create policy "Admins can do all on enquiries" on enquiries for all using (is_admin());

-- Site Settings
create policy "Public can view site settings" on site_settings for select using (true);
create policy "Admins can do all on site settings" on site_settings for all using (is_admin());

-- ==========================================
-- STORAGE SETUP
-- ==========================================

-- Create storage bucket if it doesn't exist
insert into storage.buckets (id, name, public) 
values ('images', 'images', true) 
on conflict (id) do nothing;

-- Drop existing storage policies
drop policy if exists "Public can view images" on storage.objects;
drop policy if exists "Admins can insert images" on storage.objects;
drop policy if exists "Admins can update images" on storage.objects;
drop policy if exists "Admins can delete images" on storage.objects;

-- Apply storage policies
create policy "Public can view images" on storage.objects for select using ( bucket_id = 'images' );
create policy "Admins can insert images" on storage.objects for insert with check ( bucket_id = 'images' and is_admin() );
create policy "Admins can update images" on storage.objects for update using ( bucket_id = 'images' and is_admin() );
create policy "Admins can delete images" on storage.objects for delete using ( bucket_id = 'images' and is_admin() );

-- user table
create table if not exists tb_user
(
  id serial not null,
  email character varying(512),
  handle character varying(512),
  first_name character varying(255),
  last_name character varying(255),
  password character varying(512),
  fb_image_url character varying(512),
  bio text,
  followers integer,
  following integer,
  website character varying(512),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  media json,
  constraint tb_user_pkey primary key (id),
  constraint tb_user_email_key unique (email),
  constraint tb_user_handle_key unique (handle)
)
with (
  oids=false
);
alter table tb_user
  owner to postgres;



create table tb_category
(
  id serial not null,
  name character varying(255),
  is_active boolean,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  constraint tb_category_pkey primary key (id)
)
with (
  oids=false
);
alter table tb_category
  owner to postgres;



create table tb_category_to_stream
(
  id serial not null,
  category_id integer,
  signature_id character varying(255),
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  constraint tb_category_to_stream_pkey primary key (id)
)
with (
  oids=false
);
alter table tb_category_to_stream
  owner to postgres;

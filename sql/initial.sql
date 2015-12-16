-- user table
create table if not exists tb_user
(
  id serial not null,
  email character varying(512),
  first_name character varying(255),
  last_name character varying(255),
  password character varying(512),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint tb_user_pkey primary key (id),
  constraint tb_user_email_key unique (email)
)
with (
  oids=false
);
alter table tb_user
  owner to postgres;


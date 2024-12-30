INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at,
    is_anonymous
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
    'authenticated',
    'authenticated',
    'user@example.com',
    '$2a$10$nnqTShcTX48N6QWWjbPUee.wrGz1kGx/uq5lORviCm.fn04W1BeRe',
    '2024-09-01 17:21:01.462788+00',
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    NULL,
    '{"provider": "email", "providers": ["email"]}',
    '{"username": "username", "full_name": "Test User"}',
    NULL,
    '2024-09-01 17:21:01.455486+00',
    '2024-09-01 17:21:01.46295+00',
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL,
    false,
    NULL,
    false
  );

INSERT INTO
  auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at,
    id
  )
VALUES
  (
    'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
    'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
    '{"sub": "aec53558-767e-4408-b4d6-1c1e6f17ffe5", "email": "user@example.com", "email_verified": false, "phone_verified": false}',
    'email',
    '2024-09-01 17:21:01.459821+00',
    '2024-09-01 17:21:01.459849+00',
    '2024-09-01 17:21:01.459849+00',
    'c5e81668-437b-47c2-83e2-84b8566b3018'
  );

-- Insert a test user profile
INSERT INTO profiles (id, created_at, updated_at)
VALUES 
    ('aec53558-767e-4408-b4d6-1c1e6f17ffe5', now(), now());

-- Insert family members
INSERT INTO family_members (id, profile_id, name, age, dietary_preferences, dietary_goals)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'aec53558-767e-4408-b4d6-1c1e6f17ffe5', 'John Doe', 35, '{"preferences": ["vegetarian"], "allergies": ["nuts"]}', '{"goal": "weight_loss", "target": "lose 10 pounds"}'),
    ('22222222-2222-2222-2222-222222222222', 'aec53558-767e-4408-b4d6-1c1e6f17ffe5', 'Jane Doe', 32, '{"preferences": ["pescatarian"], "allergies": []}', '{"goal": "muscle_gain", "target": "gain 5 pounds"}'),
    ('33333333-3333-3333-3333-333333333333', 'aec53558-767e-4408-b4d6-1c1e6f17ffe5', 'Jimmy Doe', 8, '{"preferences": [], "allergies": ["dairy"]}', '{"goal": "balanced_diet", "target": "healthy growth"}');

-- Insert a meal plan
INSERT INTO meal_plans (id, profile_id, start_date, end_date)
VALUES
    ('44444444-4444-4444-4444-444444444444', 'aec53558-767e-4408-b4d6-1c1e6f17ffe5', '2024-03-11', '2024-03-17');

-- Insert meal plan items
INSERT INTO meal_plan_items (meal_plan_id, family_member_id, meal_day, meal_type, recipe)
VALUES
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '2024-03-11', 'Breakfast', '{"name": "Vegetarian Omelette", "ingredients": ["eggs", "spinach", "mushrooms"], "instructions": "1. Beat eggs..."}'),
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '2024-03-11', 'Lunch', '{"name": "Quinoa Bowl", "ingredients": ["quinoa", "chickpeas", "vegetables"], "instructions": "1. Cook quinoa..."}'),
    ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2024-03-11', 'Dinner', '{"name": "Grilled Salmon", "ingredients": ["salmon", "asparagus", "lemon"], "instructions": "1. Preheat grill..."}');

-- Insert shopping list
INSERT INTO shopping_lists (id, meal_plan_id)
VALUES
    ('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444');

-- Insert shopping list items
INSERT INTO shopping_list_items (shopping_list_id, item_name, quantity)
VALUES
    ('55555555-5555-5555-5555-555555555555', 'Eggs', '1 dozen'),
    ('55555555-5555-5555-5555-555555555555', 'Spinach', '2 bags'),
    ('55555555-5555-5555-5555-555555555555', 'Mushrooms', '8 oz'),
    ('55555555-5555-5555-5555-555555555555', 'Quinoa', '1 lb'),
    ('55555555-5555-5555-5555-555555555555', 'Chickpeas', '2 cans'),
    ('55555555-5555-5555-5555-555555555555', 'Salmon', '2 lb'),
    ('55555555-5555-5555-5555-555555555555', 'Asparagus', '1 bunch'),
    ('55555555-5555-5555-5555-555555555555', 'Lemon', '3 pieces');

-- Insert meal feedback
INSERT INTO meal_feedback (meal_plan_item_id, family_member_id, rating, comments)
VALUES
    ((SELECT id FROM meal_plan_items WHERE meal_plan_id = '44444444-4444-4444-4444-444444444444' AND meal_type = 'Breakfast' LIMIT 1), 
     '11111111-1111-1111-1111-111111111111', 
     5, 
     'Loved the vegetarian omelette!'),
    ((SELECT id FROM meal_plan_items WHERE meal_plan_id = '44444444-4444-4444-4444-444444444444' AND meal_type = 'Dinner' LIMIT 1), 
     '22222222-2222-2222-2222-222222222222', 
     4, 
     'Salmon was great, could use more seasoning');
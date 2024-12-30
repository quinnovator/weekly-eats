-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create family_members table
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    age INTEGER,
    dietary_preferences JSONB DEFAULT '{}',
    dietary_goals JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create meal_plans table
CREATE TABLE meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create meal_plan_items table
CREATE TABLE meal_plan_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
    meal_day DATE NOT NULL,
    meal_type TEXT NOT NULL,
    recipe JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create shopping_lists table
CREATE TABLE shopping_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create shopping_list_items table
CREATE TABLE shopping_list_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopping_list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create meal_feedback table
CREATE TABLE meal_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_plan_item_id UUID NOT NULL REFERENCES meal_plan_items(id) ON DELETE CASCADE,
    family_member_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers for all tables with updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_family_members_updated_at
    BEFORE UPDATE ON family_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_meal_plans_updated_at
    BEFORE UPDATE ON meal_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_meal_plan_items_updated_at
    BEFORE UPDATE ON meal_plan_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_shopping_lists_updated_at
    BEFORE UPDATE ON shopping_lists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_shopping_list_items_updated_at
    BEFORE UPDATE ON shopping_list_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_feedback ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Family members policies
CREATE POLICY "Users can view their family members"
    ON family_members FOR SELECT
    USING (profile_id = auth.uid());

CREATE POLICY "Users can manage their family members"
    ON family_members FOR ALL
    USING (profile_id = auth.uid())
    WITH CHECK (profile_id = auth.uid());

-- Meal plans policies
CREATE POLICY "Users can view their meal plans"
    ON meal_plans FOR SELECT
    USING (profile_id = auth.uid());

CREATE POLICY "Users can manage their meal plans"
    ON meal_plans FOR ALL
    USING (profile_id = auth.uid())
    WITH CHECK (profile_id = auth.uid());

-- Meal plan items policies
CREATE POLICY "Users can view their meal plan items"
    ON meal_plan_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM meal_plans mp
        WHERE mp.id = meal_plan_items.meal_plan_id
        AND mp.profile_id = auth.uid()
    ));

CREATE POLICY "Users can manage their meal plan items"
    ON meal_plan_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM meal_plans mp
        WHERE mp.id = meal_plan_items.meal_plan_id
        AND mp.profile_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM meal_plans mp
        WHERE mp.id = meal_plan_items.meal_plan_id
        AND mp.profile_id = auth.uid()
    ));

-- Shopping lists policies
CREATE POLICY "Users can view their shopping lists"
    ON shopping_lists FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM meal_plans mp
        WHERE mp.id = shopping_lists.meal_plan_id
        AND mp.profile_id = auth.uid()
    ));

CREATE POLICY "Users can manage their shopping lists"
    ON shopping_lists FOR ALL
    USING (EXISTS (
        SELECT 1 FROM meal_plans mp
        WHERE mp.id = shopping_lists.meal_plan_id
        AND mp.profile_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM meal_plans mp
        WHERE mp.id = shopping_lists.meal_plan_id
        AND mp.profile_id = auth.uid()
    ));

-- Shopping list items policies
CREATE POLICY "Users can view their shopping list items"
    ON shopping_list_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM shopping_lists sl
        JOIN meal_plans mp ON mp.id = sl.meal_plan_id
        WHERE sl.id = shopping_list_items.shopping_list_id
        AND mp.profile_id = auth.uid()
    ));

CREATE POLICY "Users can manage their shopping list items"
    ON shopping_list_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM shopping_lists sl
        JOIN meal_plans mp ON mp.id = sl.meal_plan_id
        WHERE sl.id = shopping_list_items.shopping_list_id
        AND mp.profile_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM shopping_lists sl
        JOIN meal_plans mp ON mp.id = sl.meal_plan_id
        WHERE sl.id = shopping_list_items.shopping_list_id
        AND mp.profile_id = auth.uid()
    ));

-- Meal feedback policies
CREATE POLICY "Users can view their meal feedback"
    ON meal_feedback FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM meal_plan_items mpi
        JOIN meal_plans mp ON mp.id = mpi.meal_plan_id
        WHERE mpi.id = meal_feedback.meal_plan_item_id
        AND mp.profile_id = auth.uid()
    ));

CREATE POLICY "Users can manage their meal feedback"
    ON meal_feedback FOR ALL
    USING (EXISTS (
        SELECT 1 FROM meal_plan_items mpi
        JOIN meal_plans mp ON mp.id = mpi.meal_plan_id
        WHERE mpi.id = meal_feedback.meal_plan_item_id
        AND mp.profile_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM meal_plan_items mpi
        JOIN meal_plans mp ON mp.id = mpi.meal_plan_id
        WHERE mpi.id = meal_feedback.meal_plan_item_id
        AND mp.profile_id = auth.uid()
    )); 
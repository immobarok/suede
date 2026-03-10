-- Supabase PostgreSQL Complete Database Schema for SUEDE Platform

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'brand', 'user', 'reviewer')),
  
  -- Profile basics
  display_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  
  -- Body measurements
  height_cm INTEGER,
  weight_kg INTEGER,
  bust_cm INTEGER,
  waist_cm INTEGER,
  hips_cm INTEGER,
  inseam_cm INTEGER,
  shoulder_width_cm INTEGER,
  arm_length_cm INTEGER,
  
  -- Size preferences
  size_top TEXT,
  size_bottom TEXT,
  size_dress TEXT,
  size_shoe TEXT,
  
  -- Style & fit
  body_type TEXT,
  style_vibes TEXT[] DEFAULT '{}',
  fit_preference TEXT CHECK (fit_preference IN ('tight', 'fitted', 'loose', 'oversized')),
  
  -- Social stats
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  measurement_completed BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin profiles
CREATE TABLE public.admins (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  permissions JSONB DEFAULT '["full_access"]',
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Brand profiles
CREATE TABLE public.brands (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Brand info
  brand_name TEXT NOT NULL,
  brand_slug TEXT UNIQUE,
  tagline TEXT,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  
  -- Business details
  founded_year INTEGER,
  location TEXT,
  minority_owned BOOLEAN DEFAULT false,
  sustainable BOOLEAN DEFAULT false,
  
  -- Product range
  size_range_min TEXT,
  size_range_max TEXT,
  price_tier TEXT CHECK (price_tier IN ('$', '$$', '$$$', '$$$$')),
  style_categories TEXT[] DEFAULT '{}',
  
  -- Verification & subscription
  verified BOOLEAN DEFAULT false,
  subscription_tier TEXT CHECK (subscription_tier IN ('capsule', 'pro', 'partner')),
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Capsule evaluation
  capsule_score INTEGER,
  watchlist_criteria JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviewer profiles (extends base user with reviewer stats)
CREATE TABLE public.reviewer_stats (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_reviews INTEGER DEFAULT 0,
  helpful_votes_received INTEGER DEFAULT 0,
  verified_purchaser BOOLEAN DEFAULT false,
  expertise_areas TEXT[] DEFAULT '{}',
  badge TEXT,
  earnings_total DECIMAL(10,2) DEFAULT 0,
  response_rate INTEGER DEFAULT 0
);

-- ============================================
-- CAPSULE (BRAND DIRECTORY)
-- ============================================

-- Featured brands
CREATE TABLE public.featured_brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  feature_type TEXT CHECK (feature_type IN ('spotlight', 'trending', 'new_arrival')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand watchlist evaluations
CREATE TABLE public.brand_evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  evaluator_id UUID REFERENCES public.profiles(id),
  
  -- Evaluation criteria
  design_innovation INTEGER CHECK (design_innovation BETWEEN 1 AND 10),
  size_inclusivity INTEGER CHECK (size_inclusivity BETWEEN 1 AND 10),
  quality_craftsmanship INTEGER CHECK (quality_craftsmanship BETWEEN 1 AND 10),
  sustainability INTEGER CHECK (sustainability BETWEEN 1 AND 10),
  community_alignment INTEGER CHECK (community_alignment BETWEEN 1 AND 10),
  
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LOOKBOOK (REVIEWS & INQUIRIES)
-- ============================================

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Product info (auto-fetched or manual)
  brand_id UUID REFERENCES public.brands(id),
  product_name TEXT NOT NULL,
  product_url TEXT,
  product_image_url TEXT,
  category TEXT,
  
  -- Purchase details
  size_purchased TEXT,
  color_purchased TEXT,
  price_paid DECIMAL(10,2),
  
  -- Ratings (1-5 stars)
  sizing_accuracy INTEGER CHECK (sizing_accuracy BETWEEN 1 AND 5),
  material_quality INTEGER CHECK (material_quality BETWEEN 1 AND 5),
  value_for_price INTEGER CHECK (value_for_price BETWEEN 1 AND 5),
  true_to_photos INTEGER CHECK (true_to_photos BETWEEN 1 AND 5),
  customer_service INTEGER CHECK (customer_service BETWEEN 1 AND 5),
  
  -- Review content
  review_text TEXT NOT NULL,
  fit_experience TEXT CHECK (fit_experience IN ('too_small', 'slightly_small', 'true_to_size', 'slightly_large', 'too_large')),
  would_recommend BOOLEAN,
  
  -- Photos
  photos TEXT[] DEFAULT '{}',
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  -- Status
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review requests / Inquiries
CREATE TABLE public.review_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Product info
  product_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  brand_id UUID REFERENCES public.brands(id),
  product_url TEXT,
  product_image_url TEXT,
  category TEXT,
  
  -- Question details
  size_interested TEXT,
  specific_questions TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
  responses_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiry responses
CREATE TABLE public.inquiry_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID REFERENCES public.review_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Response content
  response_text TEXT NOT NULL,
  is_review_link BOOLEAN DEFAULT false,
  linked_review_id UUID REFERENCES public.reviews(id),
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review reactions (helpful votes)
CREATE TABLE public.review_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction TEXT DEFAULT 'helpful' CHECK (reaction IN ('helpful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(review_id, user_id)
);

-- Saved items (bookmarks)
CREATE TABLE public.saved_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('review', 'inquiry', 'listing', 'brand')),
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, item_type, item_id)
);

-- ============================================
-- COLLECTIVE (SOCIAL FEATURES)
-- ============================================

-- Follows
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- Match scores (cached calculations)
CREATE TABLE public.match_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  match_tier TEXT CHECK (match_tier IN ('suede_match', 'close_match', 'no_match')),
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, target_id)
);

-- ============================================
-- CONSIGN (MARKETPLACE)
-- ============================================

-- Listings
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Item details
  title TEXT NOT NULL,
  description TEXT,
  brand_id UUID REFERENCES public.brands(id),
  brand_name TEXT,
  category TEXT,
  
  -- Sizing
  size TEXT NOT NULL,
  measurements TEXT,
  
  -- Condition & pricing
  condition TEXT CHECK (condition IN ('new_with_tags', 'new_without_tags', 'like_new', 'good', 'fair')),
  asking_price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  negotiable BOOLEAN DEFAULT false,
  accept_offers BOOLEAN DEFAULT false,
  minimum_offer DECIMAL(10,2),
  
  -- Photos
  photos TEXT[] DEFAULT '{}',
  
  -- Shipping
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  ships_from TEXT,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reserved', 'sold', 'removed', 'suspended')),
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  save_count INTEGER DEFAULT 0,
  offer_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offers
CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  offer_amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.listings(id),
  buyer_id UUID REFERENCES public.profiles(id),
  seller_id UUID REFERENCES public.profiles(id),
  
  -- Pricing breakdown
  item_price DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  platform_fee DECIMAL(10,2) NOT NULL, -- 10%
  seller_payout DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Stripe references
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending_payment' CHECK (status IN (
    'pending_payment', 'payment_confirmed', 'awaiting_shipment', 
    'shipped', 'in_inspection', 'completed', 'cancelled', 'disputed'
  )),
  
  -- Shipping
  tracking_number TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  
  -- Inspection period (72 hours)
  delivered_at TIMESTAMP WITH TIME ZONE,
  inspection_deadline TIMESTAMP WITH TIME ZONE,
  inspection_completed BOOLEAN DEFAULT false,
  
  -- Dispute
  dispute_reason TEXT,
  dispute_status TEXT CHECK (dispute_status IN ('none', 'opened', 'under_review', 'resolved_buyer', 'resolved_seller')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MESSAGING
-- ============================================

-- Conversations (Consign only)
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  buyer_unread_count INTEGER DEFAULT 0,
  seller_unread_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(listing_id, buyer_id)
);

-- Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Message requests (Review-context only)
CREATE TABLE public.message_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Context (review only)
  context_type TEXT DEFAULT 'review' CHECK (context_type IN ('review')),
  context_id UUID REFERENCES public.reviews(id),
  
  -- Message
  message TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Notification details
  type TEXT NOT NULL CHECK (type IN (
    'order_confirmed', 'order_shipped', 'order_delivered', 'payment_received',
    'new_follower', 'message_request', 'inquiry_response', 'offer_received',
    'offer_accepted', 'offer_declined', 'review_helpful', 'listing_sold'
  )),
  
  -- Actor who triggered
  actor_id UUID REFERENCES public.profiles(id),
  
  -- Target object
  target_type TEXT,
  target_id UUID,
  
  -- Content
  title TEXT NOT NULL,
  body TEXT,
  image_url TEXT,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ACTIVITY FEED (Future use)
-- ============================================

CREATE TABLE public.activity_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  actor_id UUID REFERENCES public.profiles(id),
  target_type TEXT,
  target_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BRAND PORTAL
-- ============================================

-- Brand applications
CREATE TABLE public.brand_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID REFERENCES public.profiles(id),
  
  -- Company info
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  website TEXT,
  instagram TEXT,
  
  -- Brand details
  description TEXT,
  product_categories TEXT[] DEFAULT '{}',
  price_range TEXT,
  size_range TEXT,
  
  -- Application status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand claims (for existing brands)
CREATE TABLE public.brand_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES public.brands(id),
  claimant_id UUID REFERENCES public.profiles(id),
  
  -- Verification
  company_email TEXT NOT NULL,
  verification_method TEXT CHECK (verification_method IN ('email', 'dns', 'social')),
  verification_code TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand analytics (monthly snapshots)
CREATE TABLE public.brand_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES public.brands(id),
  month DATE NOT NULL,
  
  -- Metrics
  profile_views INTEGER DEFAULT 0,
  click_throughs INTEGER DEFAULT 0,
  reviews_received INTEGER DEFAULT 0,
  avg_rating DECIMAL(2,1),
  sales_referrals INTEGER DEFAULT 0,
  
  UNIQUE(brand_id, month)
);

-- ============================================
-- MEASUREMENT CONSULTATION
-- ============================================

-- Consultation sessions
CREATE TABLE public.consultation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Progress tracking
  current_step INTEGER DEFAULT 1,
  completed_steps INTEGER[] DEFAULT '{}',
  
  -- Measurements captured
  height_cm INTEGER,
  weight_kg INTEGER,
  bust_cm INTEGER,
  waist_cm INTEGER,
  hips_cm INTEGER,
  inseam_cm INTEGER,
  shoulder_width_cm INTEGER,
  arm_length_cm INTEGER,
  
  -- Status
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- INDEXES
-- ============================================

-- Profiles
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_style_vibes ON public.profiles USING GIN(style_vibes);
CREATE INDEX idx_profiles_measurements ON public.profiles(height_cm, weight_kg, bust_cm, waist_cm, hips_cm);

-- Brands
CREATE INDEX idx_brands_slug ON public.brands(brand_slug);
CREATE INDEX idx_brands_verified ON public.brands(verified) WHERE verified = true;
CREATE INDEX idx_brands_subscription ON public.brands(subscription_status, subscription_tier);

-- Reviews
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_brand_id ON public.reviews(brand_id);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX idx_reviews_featured ON public.reviews(is_featured) WHERE is_featured = true;
CREATE INDEX idx_reviews_ratings ON public.reviews(sizing_accuracy, material_quality);

-- Review requests
CREATE INDEX idx_requests_user_id ON public.review_requests(user_id);
CREATE INDEX idx_requests_status ON public.review_requests(status);

-- Listings
CREATE INDEX idx_listings_seller_id ON public.listings(seller_id);
CREATE INDEX idx_listings_status ON public.listings(status);
CREATE INDEX idx_listings_brand_id ON public.listings(brand_id);
CREATE INDEX idx_listings_price ON public.listings(asking_price);
CREATE INDEX idx_listings_category ON public.listings(category);

-- Orders
CREATE INDEX idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX idx_orders_seller ON public.orders(seller_id);
CREATE INDEX idx_orders_status ON public.orders(status);

-- Notifications
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_created ON public.notifications(created_at DESC);

-- Conversations
CREATE INDEX idx_conversations_buyer ON public.conversations(buyer_id);
CREATE INDEX idx_conversations_seller ON public.conversations(seller_id);
CREATE INDEX idx_conversations_last_message ON public.conversations(last_message_at DESC);

-- Messages
CREATE INDEX idx_messages_conversation ON public.messages(conversation_id, created_at);

-- Follows
CREATE INDEX idx_follows_follower ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);

-- Match scores
CREATE INDEX idx_match_scores_user ON public.match_scores(user_id, score DESC);

-- Saved items
CREATE INDEX idx_saved_items_user ON public.saved_items(user_id, item_type);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviewer_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, self write
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Admins: Admin only
CREATE POLICY "Admins viewable by admins"
  ON public.admins FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Brands: Public read, brand owner write
CREATE POLICY "Brands are viewable by everyone"
  ON public.brands FOR SELECT USING (true);

CREATE POLICY "Brands can update own profile"
  ON public.brands FOR UPDATE USING (auth.uid() = id);

-- Reviews: Public read, owner write
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT USING (is_published = true);

CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Review requests: Public read, owner write
CREATE POLICY "Review requests are viewable by everyone"
  ON public.review_requests FOR SELECT USING (true);

CREATE POLICY "Users can create requests"
  ON public.review_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own requests"
  ON public.review_requests FOR UPDATE USING (auth.uid() = user_id);

-- Inquiry responses: Public read, responder write
CREATE POLICY "Responses are viewable by everyone"
  ON public.inquiry_responses FOR SELECT USING (true);

CREATE POLICY "Users can create responses"
  ON public.inquiry_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own responses"
  ON public.inquiry_responses FOR UPDATE USING (auth.uid() = user_id);

-- Listings: Public read active, owner full access
CREATE POLICY "Active listings are viewable by everyone"
  ON public.listings FOR SELECT USING (status = 'active' OR auth.uid() = seller_id);

CREATE POLICY "Users can create listings"
  ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own listings"
  ON public.listings FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete own listings"
  ON public.listings FOR DELETE USING (auth.uid() = seller_id);

-- Offers: Participant only
CREATE POLICY "Offers viewable by participants"
  ON public.offers FOR SELECT USING (
    auth.uid() = buyer_id OR 
    EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND seller_id = auth.uid())
  );

CREATE POLICY "Buyers can create offers"
  ON public.offers FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Orders: Participant only
CREATE POLICY "Order participants can view"
  ON public.orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Conversations: Participant only
CREATE POLICY "Conversation participants can view"
  ON public.conversations FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can create conversations"
  ON public.conversations FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Messages: Conversation participants
CREATE POLICY "Message participants can view"
  ON public.messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id 
      AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
    )
  );

CREATE POLICY "Participants can send messages"
  ON public.messages FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id 
      AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
    )
  );

-- Message requests: Participant only
CREATE POLICY "Message request participants can view"
  ON public.message_requests FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
  );

CREATE POLICY "Users can create message requests"
  ON public.message_requests FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can update requests"
  ON public.message_requests FOR UPDATE USING (auth.uid() = recipient_id);

-- Notifications: Owner only
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Saved items: Owner only
CREATE POLICY "Users can view own saved items"
  ON public.saved_items FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own saved items"
  ON public.saved_items FOR ALL USING (auth.uid() = user_id);

-- Follows: Public read, owner write
CREATE POLICY "Follows are viewable by everyone"
  ON public.follows FOR SELECT USING (true);

CREATE POLICY "Users can manage own follows"
  ON public.follows FOR ALL USING (auth.uid() = follower_id);

-- Match scores: Participant only
CREATE POLICY "Users can view own match scores"
  ON public.match_scores FOR SELECT USING (auth.uid() = user_id);

-- Consultation sessions: Owner only
CREATE POLICY "Users can view own consultations"
  ON public.consultation_sessions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own consultations"
  ON public.consultation_sessions FOR ALL USING (auth.uid() = user_id);

-- Brand applications: Applicant and admin
CREATE POLICY "Applicants can view own applications"
  ON public.brand_applications FOR SELECT USING (
    auth.uid() = applicant_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Brand claims: Claimant and admin
CREATE POLICY "Claimants can view own claims"
  ON public.brand_claims FOR SELECT USING (
    auth.uid() = claimant_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Brand analytics: Brand owner and admin
CREATE POLICY "Brand owners can view analytics"
  ON public.brand_analytics FOR SELECT USING (
    auth.uid() = brand_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  
CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  
CREATE TRIGGER listings_updated_at BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Update follower counts
CREATE OR REPLACE FUNCTION public.handle_follow_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    UPDATE public.profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.profiles SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
    UPDATE public.profiles SET following_count = following_count - 1 WHERE id = OLD.follower_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follow_change AFTER INSERT OR DELETE ON public.follows
  FOR EACH ROW EXECUTE FUNCTION public.handle_follow_change();

-- Update helpful count on reactions
CREATE OR REPLACE FUNCTION public.handle_review_reaction()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.reviews SET helpful_count = helpful_count + 1 WHERE id = NEW.review_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.reviews SET helpful_count = helpful_count - 1 WHERE id = OLD.review_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_reaction_change AFTER INSERT OR DELETE ON public.review_reactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_review_reaction();

-- Update inquiry response count
CREATE OR REPLACE FUNCTION public.handle_inquiry_response()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.review_requests SET responses_count = responses_count + 1 WHERE id = NEW.inquiry_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.review_requests SET responses_count = responses_count - 1 WHERE id = OLD.inquiry_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inquiry_response_change AFTER INSERT OR DELETE ON public.inquiry_responses
  FOR EACH ROW EXECUTE FUNCTION public.handle_inquiry_response();

-- Update listing status on order
CREATE OR REPLACE FUNCTION public.handle_listing_sale()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.listings SET status = 'sold' WHERE id = NEW.listing_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listing_sold AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_listing_sale();

-- Update conversation last_message_at
CREATE OR REPLACE FUNCTION public.handle_new_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations 
  SET last_message_at = NEW.created_at,
      buyer_unread_count = CASE WHEN NEW.sender_id = seller_id THEN buyer_unread_count + 1 ELSE buyer_unread_count END,
      seller_unread_count = CASE WHEN NEW.sender_id = buyer_id THEN seller_unread_count + 1 ELSE seller_unread_count END
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_message AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_message();

-- Create profile on auth user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, display_name, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Calculate match score function
CREATE OR REPLACE FUNCTION public.calculate_match_score(user1_id UUID, user2_id UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  p1 RECORD;
  p2 RECORD;
BEGIN
  SELECT * INTO p1 FROM public.profiles WHERE id = user1_id;
  SELECT * INTO p2 FROM public.profiles WHERE id = user2_id;
  
  IF p1.height_cm IS NOT NULL AND p2.height_cm IS NOT NULL THEN
    score := score + GREATEST(0, 20 - ABS(p1.height_cm - p2.height_cm) / 2);
  END IF;
  
  IF p1.weight_kg IS NOT NULL AND p2.weight_kg IS NOT NULL THEN
    score := score + GREATEST(0, 20 - ABS(p1.weight_kg - p2.weight_kg));
  END IF;
  
  IF p1.bust_cm IS NOT NULL AND p2.bust_cm IS NOT NULL THEN
    score := score + GREATEST(0, 15 - ABS(p1.bust_cm - p2.bust_cm));
  END IF;
  
  IF p1.waist_cm IS NOT NULL AND p2.waist_cm IS NOT NULL THEN
    score := score + GREATEST(0, 15 - ABS(p1.waist_cm - p2.waist_cm));
  END IF;
  
  IF p1.hips_cm IS NOT NULL AND p2.hips_cm IS NOT NULL THEN
    score := score + GREATEST(0, 15 - ABS(p1.hips_cm - p2.hips_cm));
  END IF;
  
  IF p1.size_top = p2.size_top THEN score := score + 5; END IF;
  IF p1.size_bottom = p2.size_bottom THEN score := score + 5; END IF;
  IF p1.body_type = p2.body_type THEN score := score + 5; END IF;
  
  RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;
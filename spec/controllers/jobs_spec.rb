require 'rails_helper'

RSpec.describe JobsController do

  let(:u) { create(:user) }

  describe "guest user" do
    describe "GET index" do
      it "renders :index template" do
        get :index
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe "authenticated user" do
    before do
      sign_in u
    end

    describe "GET index" do
      it "renders :index template" do
        get :index
        expect(response).to render_template(:index)
      end
    end
  end
end
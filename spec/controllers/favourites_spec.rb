require 'rails_helper'

RSpec.describe FavouritesController do

  let(:u) { create(:user) }
  let!(:f) { create(:favourite, user: create(:user)) }

  describe "guest user" do
    describe "GET index" do
    end
  end

  describe "authenticated user" do
    
    before do
      sign_in u
    end

    describe "POST create" do
      let!(:f_two) { create(:favourite, job_id: 2, user: create(:user)) }

      it "adds favourite to database" do
        post :create, params: { job_id: f_two.job_id }
        expect(Favourite.exists?(f.id)).to eq true
      end
    end

    describe "POST destroy" do
      it "deletes favourite from database" do
        delete :destroy, params: { job_id: f.job_id }
        expect(Favourite.exists?(f.id)).to eq false
      end
    end
  end
end
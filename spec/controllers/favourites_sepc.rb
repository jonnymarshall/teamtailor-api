require 'rails_helper'

RSpec.describe FavouritesController do

  let(:u) { create(:user) }
  let!(:f) { create(:favourite, user: create(:user)) }

  describe "guest user" do
    let(:u) { create(:user) }
    let!(:f) { create(:favourite, user: create(:user)) }

    describe "GET index" do
    end

    describe "authenticated user" do

    before do
      sign_in u
    end
  end
end
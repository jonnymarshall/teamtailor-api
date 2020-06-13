require 'rails_helper'

require 'rails_helper'

RSpec.describe Favourite do
  let(:u) { create(:user) }
  let(:f) { create(:favourite, user: u) }
  
  describe 'favourite factory' do
    it 'must have valid data' do
      expect(f).to be_valid
    end
  end

  describe 'validations' do

    describe 'user' do
      it { should belong_to(:user) }
    end

    describe 'job_id' do
      subject { create(:favourite, user: u) }
      it { should validate_uniqueness_of(:job_id).scoped_to(:user_id) }
    end
  end
end

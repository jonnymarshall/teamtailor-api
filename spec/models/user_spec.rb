require 'rails_helper'

RSpec.describe User, type: :model do
  let(:u) { create(:user) }
  
  describe 'user factory' do
    it 'must have valid data' do
      expect(u).to be_valid
    end
  end
end

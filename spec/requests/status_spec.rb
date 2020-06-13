require 'rails_helper'

RSpec.describe 'Status Requests' do

  describe 'Root path' do
    it 'Forces sign in' do
      get('/')
      expect(response.status).to eql(302)
    end
  end
  
end